import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface AnalyticsData {
  totalStores: number;        // Changed to represent total coaches
  totalOrders: number;        // Changed to represent total gym subscriptions
  totalRevenue: number;       // Revenue from gym subscriptions
  topSellingArtworks: any[];  // Changed to top performing workout programs
  customerDemographics: any;  // Age distribution of gym members
  revenueOverTime: any;       // Monthly revenue trends
  ordersOverTime: any;        // Monthly subscription trends
  storesOverTime: any;        // Monthly new coaches added
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  getAnalyticsData(): Observable<AnalyticsData> {
    // Static data modified for a gym application admin dashboard
    return of({
      totalStores: 25,  // Total number of coaches
      totalOrders: 850, // Total number of active gym subscriptions
      totalRevenue: 42500, // Total revenue in USD from subscriptions
      
      // Top performing workout programs instead of artworks
      topSellingArtworks: [
        { name: 'Strength Training', totalSales: 300 },  // Subscriptions to this program
        { name: 'HIIT Bootcamp', totalSales: 250 },
        { name: 'Yoga Flow', totalSales: 180 }
      ],
      
      // Customer demographics (age groups of gym members)
      customerDemographics: { 
        '18-24': 35,   // Percentage or count of members in this age range
        '25-34': 45,
        '35-44': 15,
        '45+': 5
      },
      
      // Revenue trends over time (monthly data)
      revenueOverTime: { 
        monthly: [
          { month: 'Jan', revenue: 18000 },
          { month: 'Feb', revenue: 19500 },
          { month: 'Mar', revenue: 21000 }
        ],
        quarterly: [
          { quarter: 'Q1', revenue: 58500 }
        ],
        yearly: [
          { year: '2025', revenue: 58500 } // Partial year up to March 30, 2025
        ]
      },
      
      // Subscription trends over time
      ordersOverTime: { 
        monthly: [
          { month: 'Jan', orders: 280 },
          { month: 'Feb', orders: 300 },
          { month: 'Mar', orders: 320 }
        ],
        quarterly: [
          { quarter: 'Q1', orders: 900 }
        ],
        yearly: [
          { year: '2025', orders: 900 } // Partial year up to March 30, 2025
        ]
      },
      
      // New coaches added over time
      storesOverTime: { 
        monthly: [
          { month: 'Jan', storesAdded: 2 },
          { month: 'Feb', storesAdded: 3 },
          { month: 'Mar', storesAdded: 4 }
        ],
        quarterly: [
          { quarter: 'Q1', storesAdded: 9 }
        ],
        yearly: [
          { year: '2025', storesAdded: 9 } // Partial year up to March 30, 2025
        ]
      }
    });
  }
}