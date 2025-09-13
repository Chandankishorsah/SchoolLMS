import { Component } from '@angular/core';
import { ChartConfig } from '../../../shared/components/charts/charts.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
collectionChart: ChartConfig = {
    type: 'line',
    data: [65000, 71000, 68000, 75000, 82000, 89000],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    title: 'Monthly Collection'
  };

  statusChart: ChartConfig = {
    type: 'doughnut',
    data: [85, 10, 5],
    labels: ['Paid', 'Pending', 'Overdue'],
    colors: ['#28a745', '#ffc107', '#dc3545']
  };
}
