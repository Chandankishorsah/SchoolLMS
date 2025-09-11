import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { DataService } from '../../../core/services/data/data.service';
import { ChartsComponent, ChartConfig } from '../../../shared/components/charts/charts.component';
// Use your ChartsComponent

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,  ChartsComponent],
  templateUrl: './dashboard.component.html' // Assuming you moved HTML to a separate file
})
export class DashboardComponent implements OnInit {
  sidebarCollapsed = false;
  dashboardStats: any = null;
  students: any[] = [];
  currentUser: any = null;

  collectionChartConfig!: ChartConfig;
  statusChartConfig!: ChartConfig;

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user?.schoolId) {
        this.loadDashboardData(user.schoolId);
        this.loadStudents(user.schoolId);
        this.loadCollectionChart(user.schoolId);
        this.loadStatusChart(user.schoolId);
      }
    });
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  loadDashboardData(schoolId: string) {
    this.dataService.getDashboardStats('school_admin', schoolId).subscribe(stats => {
      this.dashboardStats = stats;
    });
  }

  loadStudents(schoolId: string) {
    this.dataService.getStudentsBySchool(schoolId).subscribe(students => {
      this.students = students;
    });
  }

  loadCollectionChart(schoolId: string) {
    this.dataService.getChartData('monthly_collection', schoolId).subscribe(chartData => {
      this.collectionChartConfig = {
        type: 'line',
        data: chartData.datasets[0].data,
        labels: chartData.labels,
        colors: ['rgba(79, 70, 229, 0.8)'],
        title: 'Fee Collection Overview'
      };
    });
  }

  loadStatusChart(schoolId: string) {
    this.dataService.getChartData('payment_status', schoolId).subscribe(chartData => {
      this.statusChartConfig = {
        type: 'doughnut',
        data: chartData.datasets[0].data,
        labels: chartData.labels,
        colors: chartData.datasets[0].backgroundColor,
        title: 'Payment Status'
      };
    });
  }

  trackByStudent(index: number, student: any): string {
    return student.id;
  }
}
