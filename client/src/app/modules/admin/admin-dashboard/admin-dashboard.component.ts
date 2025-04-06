import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart, registerables, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AdminService } from '../services/admin.service';
Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent implements OnInit {
  currentPage: number = 1;
  isBrowser!: boolean;
  isLoading: boolean = true;

  selectedTimePeriod: string = 'monthly';
  timePeriods: string[] = ['monthly', 'quarterly', 'yearly'];

  totalCoaches: number | undefined;
  activeSubscriptions: number | undefined;
  totalRevenue: number | undefined;

  revenueChartData: ChartDataset[] = [];
  revenueMonthlyChartData: ChartDataset[] = [];
  CoursesChartData: ChartDataset[] = [];

  revenueChartLabels: any;
  revenueChartMonthlyLabels: any;
  CoursesLabels: any;

  lineChartOptions: ChartOptions = { responsive: true };
  lineChartLegend = true;
  lineChartType: ChartType = 'line';

  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  barChartLegend = true;
  barChartType: ChartType = 'bar';

  constructor(
    private adminService: AdminService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.adminService.getCoachesNumber().subscribe(r => {
      this.totalCoaches = r.totalCoaches;
    });
    this.adminService.getTotalActiveSubscriptions().subscribe(r => {
      this.activeSubscriptions = r.activeSubscriptions;
    });
    this.adminService.getTotalRevenue().subscribe(r => {
      this.totalRevenue = r.data.totalRevenue;
    });

    this.adminService.getTotalRevenue().subscribe((res: any) => {
      const revenueBreakdown = res.data;
      this.revenueChartData = [
        {
          data: [
            revenueBreakdown.totalRevenue,
            revenueBreakdown.courseRevenue,
            revenueBreakdown.subscriptionRevenue,
          ],
          label: 'Revenue Breakdown',
          backgroundColor: [
            'rgba(59, 130, 246, 0.7)',
            'rgba(16, 185, 129, 0.7)',
            'rgba(234, 179, 8, 0.7)'
          ],
          borderWidth: 1
        }
      ];
      this.revenueChartLabels = ['Course Revenue', 'Subscription Revenue', 'Total Revenue'];
    });

    this.loadMonthlyData();
    this.isLoading = false;
  }

  onTimePeriodChange(period: string): void {
    this.selectedTimePeriod = period;
    if (period === 'monthly') {
      this.loadMonthlyData();
    } else if (period === 'quarterly') {
      this.adminService.getQuarterlyRevenue().subscribe(res => {
        const revenueBreakdown = res.quarterlyRevenue;
        this.revenueMonthlyChartData = [
          {
            data: revenueBreakdown.map((item: any) => item.total),
            label: 'Quarterly Revenue',
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
            borderWidth: 1
          }
        ];
        this.revenueChartMonthlyLabels = revenueBreakdown.map((item: any) => item.period);
      });

      this.adminService.getQuarterlyCourseReservations().subscribe(res => {
        const revenueBreakdown = res.quarterlyReservations;
        this.CoursesChartData = [
          {
            data: revenueBreakdown.map((item: any) => item.count),
            label: 'Quarterly courses reservation',
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
            borderWidth: 1
          }
        ];
        this.CoursesLabels = revenueBreakdown.map((item: any) => item.period);
      });

    } else {
      this.adminService.getYearlyyRevenue().subscribe(res => {
        const revenueBreakdown = res.yearlyRevenue;
        this.revenueMonthlyChartData = [
          {
            data: revenueBreakdown.map((item: any) => item.total),
            label: 'Yearly Revenue',
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
            borderWidth: 1
          }
        ];
        this.revenueChartMonthlyLabels = revenueBreakdown.map((item: any) => item.year);
      });

      this.adminService.getYearlyCourseReservations().subscribe(res => {
        const revenueBreakdown = res.yearlyReservations;
        this.CoursesChartData = [
          {
            data: revenueBreakdown.map((item: any) => item.count),
            label: 'Yearly courses reservation',
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
            borderWidth: 1
          }
        ];
        this.CoursesLabels = revenueBreakdown.map((item: any) => item.year);
      });
    }
  }

  private loadMonthlyData(): void {
    this.adminService.getMonthlyRevenue().subscribe(res => {
      const revenueBreakdown = res.monthlyRevenue;
      this.revenueMonthlyChartData = [
        {
          data: revenueBreakdown.map((item: any) => item.total),
          label: 'Monthly Revenue',
          backgroundColor: 'rgba(59, 130, 246, 0.7)',
          borderWidth: 1
        }
      ];
      this.revenueChartMonthlyLabels = revenueBreakdown.map((item: any) => item.month);
    });

    this.adminService.getMonthlyCourseReservations().subscribe(res => {
      const revenueBreakdown = res.monthlyReservations;
      this.CoursesChartData = [
        {
          data: revenueBreakdown.map((item: any) => item.count),
          label: 'Monthly courses reservation',
          backgroundColor: 'rgba(59, 130, 246, 0.7)',
          borderWidth: 1
        }
      ];
      this.CoursesLabels = revenueBreakdown.map((item: any) => item.month);
    });
  }
}