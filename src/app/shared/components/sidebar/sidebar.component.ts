import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth/auth.service';
interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles?: string[];
  children?: MenuItem[];
}
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
@Input() collapsed = false;
  
  private authService = inject(AuthService);
  private router = inject(Router);
  
  currentUser: User | null = null;

  constructor() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  getMenuItems(): MenuItem[] {
    const allMenuItems: MenuItem[] = [
      {
        label: 'Dashboard',
        icon: 'fas fa-tachometer-alt',
        route: '/dashboard'
      },
      {
        label: 'Schools Management',
        icon: 'fas fa-school',
        route: '/super-admin/schools',
        roles: ['super-admin']
      },
      {
        label: 'Global Settings',
        icon: 'fas fa-cogs',
        route: '/super-admin/settings',
        roles: ['super-admin']
      },
      {
        label: 'Students',
        icon: 'fas fa-user-graduate',
        route: '/school-admin/students',
        roles: ['school-admin']
      },
      {
        label: 'Fee Collection',
        icon: 'fas fa-money-bill-wave',
        route: '/school-admin/fees',
        roles: ['school-admin']
      },
      {
        label: 'Reports',
        icon: 'fas fa-chart-bar',
        route: '/school-admin/reports',
        roles: ['school-admin']
      },
      {
        label: 'School Settings',
        icon: 'fas fa-cog',
        route: '/school-admin/settings',
        roles: ['school-admin']
      },
      {
        label: 'My Children',
        icon: 'fas fa-child',
        route: '/parent/children',
        roles: ['parent']
      },
      {
        label: 'Fee Details',
        icon: 'fas fa-receipt',
        route: '/parent/fees',
        roles: ['parent']
      },
      {
        label: 'Payment History',
        icon: 'fas fa-history',
        route: '/parent/history',
        roles: ['parent']
      }
    ];

    // Filter menu items based on user role
    return allMenuItems.filter(item => 
      !item.roles || 
      (this.currentUser && item.roles.includes(this.currentUser.role))
    );
  }
}
