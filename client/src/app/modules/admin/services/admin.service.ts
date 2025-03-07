import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface AnalyticsData {
  totalStores: number;
  totalOrders: number;
  totalRevenue: number;
  topSellingArtworks: any[];
  customerDemographics: any;
  revenueOverTime: any;
  ordersOverTime: any;
  storesOverTime: any;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  getAnalyticsData(): Observable<AnalyticsData> {
    // Replace this with an actual HTTP call if necessary
    return of({
      totalStores: 120,
      totalOrders: 2300,
      totalRevenue: 500,
      topSellingArtworks: [{ name: 'Art 1', totalSales: 200 }, { name: 'Art 2', totalSales: 150 }],
      customerDemographics: { '18-24': 30, '25-34': 50, '35-44': 20 },
      revenueOverTime: { monthly: [{ month: 'Jan', revenue: 15000 }, { month: 'Feb', revenue: 17000 }] },
      ordersOverTime: { monthly: [{ month: 'Jan', orders: 200 }, { month: 'Feb', orders: 220 }] },
      storesOverTime: { monthly: [{ month: 'Jan', storesAdded: 10 }, { month: 'Feb', storesAdded: 15 }] }
    });
  }
}
