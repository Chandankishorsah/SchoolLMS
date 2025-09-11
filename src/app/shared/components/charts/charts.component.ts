import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

export interface ChartConfig {
  type: ChartType;
  data: number[];
  labels: string[];
  title?: string;
  colors?: string[];
}

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnChanges {
  @Input() config!: ChartConfig;
  @Input() height: string = '350px';  // Default height

  chartData!: ChartConfiguration['data'];
  chartOptions!: ChartConfiguration['options'];

  ngOnChanges(changes: SimpleChanges) {
    if (!this.config) return;

    this.chartData = {
      labels: this.config.labels,
      datasets: [
        {
          data: this.config.data,
          backgroundColor: this.config.colors || this.getDefaultColors(),
          borderColor: this.config.type === 'line' ? '#4f46e5' : undefined,
          borderWidth: 2,
          fill: this.config.type === 'line'
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' },
        title: this.config.title
          ? { display: true, text: this.config.title }
          : undefined
      }
    };
  }

  private getDefaultColors(): string[] {
    return ['#4f46e5', '#22c55e', '#fbbf24', '#ef4444', '#06b6d4'];
  }
}
