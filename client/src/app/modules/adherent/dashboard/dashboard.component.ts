import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AdherentService } from '../../../core/services/adherent.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private _adherentService: AdherentService) {}

  data: any;

  ngOnInit(): void {
    this._adherentService.getMySubscriptionDetails().subscribe((r: any) => {
      this.data = r.subscription;
      console.log(this.data);

      const duration = this.data.duration;
      const remainingDays = this.data.remainingDays;
      const usedDays = duration - remainingDays;

      this.createChart(usedDays, remainingDays);
    });
  }
  getUsagePercentage(total: number, remaining: number): number {
    const used = total - remaining;
    return Math.round((used / total) * 100);
  }
  
  currentDate = new Date();
  
  createChart(usedDays: number, remainingDays: number): void {
    const ctx = document.getElementById('subscriptionChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Days Used', 'Days Remaining'],
        datasets: [{
          data: [usedDays, remainingDays],
          backgroundColor: ['#FF6B6B', '#4ECDC4'],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        cutout: '70%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#ffffff',
              padding: 20
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: { size: 14 },
            bodyFont: { size: 12 }
          }
        }
      }
    });
  }
}
