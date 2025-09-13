import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { DataService } from '../../../../core/services/data/data.service';
import { ChartsComponent } from '../../../../shared/components/charts/charts.component';

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
  imports: [CommonModule, ChartsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  dashboardStats: any;
  schools: any[] = [];

  monthlyChartConfig = {
    type: 'line' as const,
    data: [45000, 52000, 48000, 61000, 58000, 67000],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    title: 'Monthly Collection Trend',
  };

  statusChartConfig = {
    type: 'doughnut' as const,
    data: [75, 25],
    labels: ['Collected', 'Outstanding'],
    title: 'Collection Status',
  };

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDashboardData();
    this.loadSchools();
  }

  loadDashboardData() {
    this.dataService.getDashboardStats('super-admin').subscribe((stats) => {
      this.dashboardStats = stats;
    });
  }

  loadSchools() {
    this.dataService.getSchools().subscribe((schools) => {
      this.schools = schools;
    });
  }

  getCollectionRate(school: any): number {
    return school.totalFees > 0
      ? (school.paidFees / school.totalFees) * 100
      : 0;
  }

  trackBySchool(index: number, school: any): string {
    return school.id;
  }
  SchoolSettings(url: any) {
    this.router.navigateByUrl('/super-admin/schools/' + url);
  }
}
