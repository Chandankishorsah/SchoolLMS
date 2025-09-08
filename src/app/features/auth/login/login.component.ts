import { Component, inject } from '@angular/core';
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
  loginForm: FormGroup;
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
    // Redirect if already logged in
    if (this.authService.isAuthenticated) {
      this.redirectToDashboard();
    }
  }

  setDemoCredentials(type: string) {
    const credentials = {
      super: { email: 'superadmin@school.com', password: 'password' },
      school: { email: 'schooladmin@greenwood.com', password: 'password' },
      parent: { email: 'parent@example.com', password: 'password' }
    };

    const cred = credentials[type as keyof typeof credentials];
    this.loginForm.patchValue(cred);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: (user) => {
          this.isLoading = false;
          this.redirectToDashboard();
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message;
        }
      });
    }
  }

  private redirectToDashboard() {
    const role = this.authService.userRole;
    switch (role) {
      case 'super-admin':
        this.router.navigate(['/super-admin']);
        break;
      case 'school-admin':
        this.router.navigate(['/school-admin']);
        break;
      case 'parent':
        this.router.navigate(['/parent']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }
}
