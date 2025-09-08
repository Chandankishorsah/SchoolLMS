import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { ThemeService } from '../../core/services/theme/theme.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { HeaderComponent } from "../../shared/components/header/header.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, SidebarComponent, HeaderComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
private themeService = inject(ThemeService);
  private authService = inject(AuthService);
  
  sidebarCollapsed = false;

  ngOnInit(): void {
    // Initialize theme based on user role and school settings
    this.initializeTheme();
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  private initializeTheme(): void {
    const user = this.authService.currentUser;
    if (user?.schoolId) {
      // In a real app, fetch school theme and call this.themeService.setTheme(...)
      // ThemeService already applies saved/default theme on init
      return;
    }
  }
}
