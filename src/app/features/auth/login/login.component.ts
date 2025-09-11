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
    console.log('Login component initialized'); // Debug
    this.authService.getUserInfo(); // Debug - show current auth state
    
    // Redirect if already logged in
    if (this.authService.isAuthenticated) {
      console.log('User already authenticated, redirecting...'); // Debug
      this.redirectToDashboard();
    }
  }

  setDemoCredentials(type: string) {
    console.log('Setting demo credentials for:', type); // Debug
    
    const credentials = {
      super: { email: 'superadmin@school.com', password: 'password' },
      school: { email: 'schooladmin@greenwood.com', password: 'password' },
      parent: { email: 'parent@example.com', password: 'password' }
    };

    const cred = credentials[type as keyof typeof credentials];
    if (cred) {
      this.loginForm.patchValue(cred);
      console.log('Demo credentials set:', cred.email); // Debug
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      console.log('Starting login process...'); // Debug

      this.authService.login(this.loginForm.value).subscribe({
        next: (user) => {
          console.log('Login component received user:', user); // Debug
          this.isLoading = false;
          
          // Small delay to ensure user data is properly set
          setTimeout(() => {
            this.authService.getUserInfo(); // Debug - show updated auth state
            this.redirectToDashboard();
          }, 100);
        },
        error: (error) => {
          console.error('Login component error:', error); // Debug
          this.isLoading = false;
          this.errorMessage = error.message;
        }
      });
    } else {
      console.warn('Login form is invalid:', this.loginForm.errors); // Debug
    }
  }

  private redirectToDashboard() {
    const role = this.authService.userRole;
    console.log('Redirecting user with role:', role); // Debug
    
    let targetRoute: string[] = [];
    targetRoute = role ? [`/${role}/dashboard`] : ['/dashboard'];
    this.router.navigate(['/dashboard'])
    // switch (role) {
    //   case 'super-admin':
    //     targetRoute = ['/super-admin/dashboard'];
    //     // या अगर second solution use किया है:
    //     // targetRoute = ['/super-admin/dashboard'];
    //     break;
    //   case 'school-admin':
    //     targetRoute = ['/main/school-admin'];
    //     // या: targetRoute = ['/school-admin'];
    //     break;
    //   case 'parent':
    //     targetRoute = ['/main/parent'];
    //     // या: targetRoute = ['/parent'];
    //     break;
    //   default:
    //     console.warn('Unknown role, redirecting to default dashboard'); // Debug
    //     targetRoute = ['/main/dashboard'];
    //     // या: targetRoute = ['/dashboard'];
    // }
    
    console.log('Navigating to:', targetRoute); // Debug
    
    this.router.navigate(targetRoute).then(
      (success) => {
        console.log('Navigation success:', success); // Debug
        if (!success) {
          console.error('Navigation failed for route:', targetRoute); // Debug
        }
      },
      (error) => {
        console.error('Navigation error:', error); // Debug
      }
    );
  }

  // ✅ Debug method - call from template if needed
  debugAuthState() {
    this.authService.getUserInfo();
  }

  // ✅ Clear auth data - useful for testing
  clearAuthData() {
    this.authService.clearAuthData();
  }
}