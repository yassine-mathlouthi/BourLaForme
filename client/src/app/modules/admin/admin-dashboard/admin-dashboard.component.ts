import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart,registerables, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AdminService } from '../services/admin.service';
Chart.register(...registerables); // Register Chart.js components

interface MonthlyChange {
  value: number;
  percentage: number;
  trend: 'positive' | 'negative' | 'neutral';
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent implements OnInit {
  
  chartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']; 
  chartData: ChartDataset<'line'>[] = [
    {
      label: 'Dataset 1',
      data: [1, 2, 2, 3, 4, 5, 6],
      borderColor: 'blue',
      backgroundColor: 'rgba(0, 0, 255, 0.2)',
      fill: true
    },
    {
      label: 'Dataset 2',
      data: [6, 5, 4, 3, 2, 2, 1],
      borderColor: 'red',
      backgroundColor: 'rgba(255, 0, 0, 0.2)',
      fill: true
    }
  ];
  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
    }
  };


  
 
 
 
 
 
  currentPage: number = 1;
  revenueChange: MonthlyChange = { value: 0, percentage: 0, trend: 'neutral' };
  ordersChange: MonthlyChange = { value: 0, percentage: 0, trend: 'neutral' };
  storesChange: MonthlyChange = { value: 0, percentage: 0, trend: 'neutral' };
  pieChartLegend: boolean = true;
  pieChartType: ChartType = 'pie';

  revenueOverTime: any;
  ordersOverTime: any;
  storesOverTime: any;
  totalCoaches: number | undefined;
  activeSubscriptions: number | undefined;
  totalRevenue: number | undefined;
  topSellingArtworks: any[] | undefined;
  customerDemographics: any;

  selectedTimePeriod: string = 'monthly';
  timePeriods: string[] = ['monthly', 'quarterly', 'yearly'];

  isLoading: boolean = true;

  lineChartLabels: string[] = [];
  lineChartOptions: ChartOptions = {
    responsive: true
  };
  lineChartLegend = true;
  lineChartType: ChartType = 'line';

  revenueChartData: ChartDataset[] = [];
  revenueMonthlyChartData: ChartDataset[] = [];
  ordersStoresChartData: ChartDataset[] = [];

  barChartData: ChartDataset[] = [];
  barChartLabels: string[] = [];
  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  barChartLegend = true;
  barChartType: ChartType = 'bar';

  pieChartData: ChartDataset[] = [];
  pieChartLabels: string[] = [];
  pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  isBrowser!: boolean;
  revenueChartLabels:any
  revenueChartMonthlyLabels:any
  revenueChartQuarterlyLabels:any
  revenueQuarterlyChartData:any
  
  constructor(
    private adminService: AdminService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {   this.isBrowser = isPlatformBrowser(platformId); }
    data:any
  ngOnInit(): void {
    this.adminService.getCoachesNumber().subscribe(r=>{
      this.totalCoaches = r.totalCoaches;
    })  
    this.adminService.getTotalActiveSubscriptions().subscribe(r=>{
      this.activeSubscriptions = r.activeSubscriptions;
    })  
    this.adminService.getTotalRevenue().subscribe(r=>{
      this.totalRevenue = r.data.totalRevenue;
    }) 
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
            'rgba(59, 130, 246, 0.7)',   // course
            'rgba(16, 185, 129, 0.7)',   // subscription
            'rgba(234, 179, 8, 0.7)'     // total
          ],
          borderWidth: 1
        }
      ];
    
      this.revenueChartLabels = ['Course Revenue', 'Subscription Revenue', 'Total Revenue'];
    });
    this.adminService.getMonthlyRevenue().subscribe(res => {
      const revenueBreakdown = res.monthlyRevenue;
    
      this.revenueMonthlyChartData = [
        {
          data: revenueBreakdown.map((item: any) => item.total),
          label: 'Monthly Revenue',
          backgroundColor: 'rgba(59, 130, 246, 0.7)', // single color for all bars
          borderWidth: 1
        }
      ];
    
      this.revenueChartMonthlyLabels = revenueBreakdown.map((item: any) => item.month);
    });
    this.adminService.getMonthlyCourseReservations().subscribe(r=>{
      console.log(r)
    }) 
    
    
    

    
    
          /*
          
          this.totalRevenue = data.totalRevenue;
          this.topSellingArtworks = data.topSellingArtworks;
          this.customerDemographics = data.customerDemographics;

          this.revenueOverTime = data.revenueOverTime;
          this.ordersOverTime = data.ordersOverTime;
          this.storesOverTime = data.storesOverTime;

          this.prepareCharts();
          this.calculateMonthlyChanges(data);
          this.isLoading = false; */

          this.isLoading = false;
       
  }

  prepareCharts(): void {
    this.prepareBarChart();
    this.preparePieChart();
    this.onTimePeriodChange(this.selectedTimePeriod);
  }

  calculateMonthlyChanges(data: any): void {
    const calculateChange = (timeSeriesData: any, metric: string): MonthlyChange => {
      if (!timeSeriesData?.monthly || timeSeriesData.monthly.length < 2) {
        return { value: 0, percentage: 0, trend: 'neutral' };
      }
      const sortedData = [...timeSeriesData.monthly].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      const currentMonth = sortedData[0][metric];
      const previousMonth = sortedData[1][metric];
      const difference = currentMonth - previousMonth;
      const percentage = previousMonth !== 0 ? (difference / previousMonth) * 100 : 0;

      return {
        value: Math.abs(difference),
        percentage: Math.abs(percentage),
        trend: difference > 0 ? 'positive' : difference < 0 ? 'negative' : 'neutral'
      };
    };

    this.revenueChange = calculateChange(data.revenueOverTime, 'revenue');
    this.ordersChange = calculateChange(data.ordersOverTime, 'orders');
    this.storesChange = calculateChange(data.storesOverTime, 'storesAdded');
  }

  onTimePeriodChange(period: string): void {
    this.selectedTimePeriod = period;
    if(this.selectedTimePeriod === 'monthly'){
      this.adminService.getMonthlyRevenue().subscribe(res => {
        const revenueBreakdown = res.monthlyRevenue;
      
        this.revenueMonthlyChartData = [
          {
            data: revenueBreakdown.map((item: any) => item.total),
            label: 'Monthly Revenue',
            backgroundColor: 'rgba(59, 130, 246, 0.7)', // single color for all bars
            borderWidth: 1
          }
        ];
      
        this.revenueChartMonthlyLabels = revenueBreakdown.map((item: any) => item.month);
      });
    }else if (this.selectedTimePeriod === 'quarterly'){
      this.adminService.getQuarterlyRevenue().subscribe(res => {
        console.log('here',res)
        const revenueBreakdown = res.quarterlyRevenue;
      
        this.revenueMonthlyChartData = [
          {
            data: revenueBreakdown.map((item: any) => item.total),
            label: 'Quarterly Revenue',
            backgroundColor: 'rgba(59, 130, 246, 0.7)', // single color for all bars
            borderWidth: 1
          }
        ];
      
        this.revenueChartMonthlyLabels = revenueBreakdown.map((item: any) => item.period);
      });
    }else{
      this.adminService.getYearlyyRevenue().subscribe(res => {
        console.log('here',res)
        const revenueBreakdown = res.yearlyRevenue;
      
        this.revenueMonthlyChartData = [
          {
            data: revenueBreakdown.map((item: any) => item.total),
            label: 'Yearly Revenue',
            backgroundColor: 'rgba(59, 130, 246, 0.7)', // single color for all bars
            borderWidth: 1
          }
        ];
      
        this.revenueChartMonthlyLabels = revenueBreakdown.map((item: any) => item.year);
      });

    }
    
    
    /* const labels = this.revenueOverTime[this.selectedTimePeriod].map((item: any) =>
      this.selectedTimePeriod === 'monthly' ? item.month : (item.quarter || item.year)
    );

    const revenueData = this.revenueOverTime[this.selectedTimePeriod].map((item: any) => item.revenue);
    const ordersData = this.ordersOverTime[this.selectedTimePeriod].map((item: any) => item.orders);
    const storesData = this.storesOverTime[this.selectedTimePeriod].map((item: any) => item.storesAdded);

    this.lineChartLabels = labels;

    // Chart 1: Revenue
    this.revenueChartData = [
      { data: revenueData, label: 'Revenue', borderColor: 'rgba(74, 222, 128, 0.7)', fill: false },
    ];

    // Chart 2: Orders and Stores
    this.ordersStoresChartData = [
      { data: ordersData, label: 'Orders', borderColor: 'rgba(102, 126, 234, 0.7)', fill: false },
      { data: storesData, label: 'Stores Added', borderColor: 'rgba(252, 165, 165, 0.7)', fill: false },
    ]; */
  }

  prepareBarChart(): void {
    if (this.topSellingArtworks) {
      const { backgroundColor, hoverBackgroundColor } = this.generateChartColors(this.topSellingArtworks.length);
      this.barChartLabels = this.topSellingArtworks.map((artwork: any) => artwork.name);
      this.barChartData = [{
        data: this.topSellingArtworks.map((artwork: any) => artwork.totalSales),
        label: 'Sold ',
        backgroundColor,
        hoverBackgroundColor,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: backgroundColor.map(color => color.replace('0.7)', '1)'))
      }];
    }
  }

  generateChartColors(numCategories: number) {
    const baseColors = [
      'rgba(102, 126, 234, 0.7)', 'rgba(74, 222, 128, 0.7)', 'rgba(252, 165, 165, 0.7)',
      'rgba(249, 168, 212, 0.7)', 'rgba(134, 239, 172, 0.7)', 'rgba(147, 197, 253, 0.7)'
    ];
    const backgroundColor = baseColors.slice(0, numCategories);
    const hoverBackgroundColor = backgroundColor.map(color => color.replace('0.7)', '0.9)'));
    return { backgroundColor, hoverBackgroundColor };
  }

  preparePieChart(): void {
    const demographicKeys: string[] = Object.keys(this.customerDemographics);
    const demographicValues: number[] = Object.values(this.customerDemographics) as number[];
    const { backgroundColor, hoverBackgroundColor } = this.generateChartColors(demographicKeys.length);

    this.pieChartLabels = demographicKeys;
    this.pieChartData = [
      {
        data: demographicValues,
        backgroundColor,
        hoverBackgroundColor
      }
    ];
  }
}
