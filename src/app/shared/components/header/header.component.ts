import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
 @Output() toggleSidebar = new EventEmitter<void>();
  
  private authService = inject(AuthService);
  currentUser: User | null = null;

  constructor() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  getUserRole(role: string): string {
    switch (role) {
      case 'super-admin': return 'Super Admin';
      case 'school-admin': return 'School Admin';
      case 'parent': return 'Parent';
      default: return role;
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
