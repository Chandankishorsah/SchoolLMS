import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm:any= FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.authService.getUserInfo();

    if (this.authService.isAuthenticated) {
      this.redirectToDashboard();
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      console.warn('Login form is invalid:', this.loginForm.errors);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (user) => {
        this.isLoading = false;
        setTimeout(() => {
          this.authService.getUserInfo();
          this.redirectToDashboard();
        }, 100);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error?.error?.message || error.message || 'Login failed';
      }
    });
  }

 private redirectToDashboard() {
  const role = this.authService.userRole;

  let targetDomain = 'localhost:4200';  // fallback
  let targetRoute = '/dashboard';

  // if (role === 'super-admin') {
  //   targetDomain = 'superadmin.localhost:4200';
  // } else if (role === 'school-admin') {
  //   targetDomain = 'school.localhost:4200';
  // } else if (role === 'parent') {
  //   targetDomain = 'parent.localhost:4200';
  // }

  window.location.href = `http://${targetDomain}${targetRoute}`;
}

  // Optional debug methods
  debugAuthState() {
    this.authService.getUserInfo();
  }

  clearAuthData() {
    this.authService.clearAuthData();
  }
}