import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'doughnut';
  data: any[];
  labels: string[];
  title?: string;
  colors?: string[];
}
@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent {

}
