import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
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
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
 @Input() isCollapsed = false;
  @Input() userRole = '';
  @Output() toggleSidebar = new EventEmitter<void>();

  menuItems: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.setMenuItems();
  }

  ngOnChanges() {
    this.setMenuItems();
  }

  private setMenuItems() {
    switch (this.userRole) {
      case 'super-admin':
        this.menuItems = [
          { label: 'Dashboard', icon: 'fas fa-tachometer-alt', route: '/super-admin' },
          { label: 'Schools', icon: 'fas fa-school', route: '/super-admin/schools' },
          { label: 'Users', icon: 'fas fa-user-tie', route: '/super-admin/schools/manager' },
          { label: 'Class', icon: 'fas fa-chalkboard', route: '/super-admin/schools/class' },
          { label: 'Academic Year', icon: 'fa-solid fa-calendar-alt', route: '/super-admin/schools/academic-year' },



          // { label: 'Reports', icon: 'fas fa-chart-bar', route: '/super-admin/reports' },
          // { label: 'Settings', icon: 'fas fa-cog', route: '/super-admin/settings' }

        ];
        break;
      case 'school-admin':
        this.menuItems = [
          { label: 'Dashboard', icon: 'fas fa-tachometer-alt', route: '/school-admin' },
          { label: 'Students', icon: 'fas fa-user-graduate', route: '/school-admin/students' },
          { label: 'Fees', icon: 'fas fa-dollar-sign', route: '/school-admin/fees' },
          { label: 'Reports', icon: 'fas fa-chart-line', route: '/school-admin/reports' },
          { label: 'Settings', icon: 'fas fa-cog', route: '/school-admin/settings' }
        ];
        break;
      case 'parent':
        this.menuItems = [
          { label: 'Dashboard', icon: 'fas fa-tachometer-alt', route: '/parent' },
          { label: 'My Children', icon: 'fas fa-child', route: '/parent/children' },
          { label: 'Fee History', icon: 'fas fa-history', route: '/parent/history' },
          { label: 'Profile', icon: 'fas fa-user', route: '/parent/profile' }
        ];
        break;
    }
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
  }
}
