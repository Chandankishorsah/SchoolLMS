import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    const user = this.authService.currentUser;
    if (user) {
      this.redirectUser(user);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  private redirectUser(user: User): void {
    setTimeout(() => {
      switch (user.role) {
        case 'super-admin':
          this.router.navigate(['/super-admin/dashboard']);
          break;
        case 'school-admin':
          this.router.navigate(['/school-admin/dashboard']);
          break;
        case 'parent':
          this.router.navigate(['/parent/dashboard']);
          break;
        default:
          this.router.navigate(['/auth/login']);
      }
    }, 1000);
  }
}
