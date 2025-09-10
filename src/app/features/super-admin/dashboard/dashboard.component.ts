import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
interface DashboardStats {
  totalSchools: number;
  totalStudents: number;
  totalRevenue: number;
  pendingPayments: number;
}

interface RecentActivity {
  id: string;
  type: 'payment' | 'registration' | 'school_added';
  message: string;
  timestamp: Date;
  school?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  router= inject(Router);
  stats: DashboardStats = {
    totalSchools: 0,
    totalStudents: 0,
    totalRevenue: 0,
    pendingPayments: 0
  };

  recentActivities: RecentActivity[] = [];
  
  mockSchools = [
    { name: 'Greenwood High School', location: 'Downtown', students: 1250, revenue: 125000, status: 'Active', statusColor: 'success' },
    { name: 'Sunrise Elementary', location: 'Suburbia', students: 800, revenue: 80000, status: 'Active', statusColor: 'success' },
    { name: 'Oak Valley Academy', location: 'North Side', students: 950, revenue: 95000, status: 'Pending', statusColor: 'warning' },
    { name: 'Pine Tree School', location: 'East District', students: 600, revenue: 60000, status: 'Active', statusColor: 'success' }
  ];

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadRecentActivities();
  }

  private loadDashboardData(): void {
    this.stats = {
      totalSchools: 15,
      totalStudents: 12450,
      totalRevenue: 1245000,
      pendingPayments: 45
    };
  }

  private loadRecentActivities(): void {
    this.recentActivities = [
      {
        id: '1',
        type: 'payment',
        message: 'Payment of $500 received from Greenwood High School',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        school: 'Greenwood High School'
      },
      {
        id: '2',
        type: 'school_added',
        message: 'New school "Valley Academy" registered',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
      },
      {
        id: '3',
        type: 'registration',
        message: '25 new students registered across all schools',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4)
      }
    ];
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'payment': return 'fas fa-dollar-sign';
      case 'school_added': return 'fas fa-school';
      case 'registration': return 'fas fa-user-plus';
      default: return 'fas fa-info';
    }
  }

  getActivityColor(type: string): string {
    switch (type) {
      case 'payment': return 'success';
      case 'school_added': return 'primary';
      case 'registration': return 'info';
      default: return 'secondary';
    }
  }
SchoolSettings(url: any) {
  this.router.navigateByUrl('/super-admin/schools/' + url);
}

}


