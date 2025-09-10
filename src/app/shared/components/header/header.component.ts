import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { User } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private authService = inject(AuthService);  
  @Input() pageTitle = 'School Fees Management';

  @Output() toggleSidebar = new EventEmitter<void>();

  currentUser: User | null = null;
  currentDateTime = new Date();

  constructor() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  getUserRoleDisplay(): string {
    const roleMap: { [key: string]: string } = {
      'super-admin': 'Super Admin',
      'school-admin': 'School Admin',
      'parent': 'Parent'
    };
    return roleMap[this.currentUser?.role || ''] || '';
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
  }
}
