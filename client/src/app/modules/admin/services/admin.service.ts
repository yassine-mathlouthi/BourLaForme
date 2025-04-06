import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

interface AnalyticsData {
  totalStores: number;        // Total number of coaches
  totalOrders: number;        // Total gym subscriptions
  totalRevenue: number;       // Revenue from subscriptions
  topSellingArtworks: any[];  // Top workout programs
  customerDemographics: any;  // Age distribution
  revenueOverTime: any;       // Monthly revenue
  ordersOverTime: any;        // Monthly subscriptions
  storesOverTime: any;        // Monthly coaches added
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api/pourlaforme';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = sessionStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  // Individual calls
  getCoachesNumber(): Observable<any> {
    return this.http.get(`${this.apiUrl}/statistics/totalCoaches`, this.getAuthHeaders());
  }

  getTotalActiveSubscriptions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/statistics/totalActiveSubscriptions`, this.getAuthHeaders());
  }

  getTotalRevenue(): Observable<any> {
    return this.http.get(`${this.apiUrl}/statistics/RevenueStatistics`, this.getAuthHeaders());
  }
  getMonthlyRevenue(): Observable<any> {
    return this.http.get(`${this.apiUrl}/statistics/MonthlyRevenue`, this.getAuthHeaders());
  }
  getQuarterlyRevenue(): Observable<any> {
    return this.http.get(`${this.apiUrl}/statistics/QuarterlyRevenue`, this.getAuthHeaders());
  }
  getYearlyyRevenue(): Observable<any> {
    return this.http.get(`${this.apiUrl}/statistics/YearlyRevenue`, this.getAuthHeaders());
  }
  getMonthlyCourseReservations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/statistics/MonthlyCourseReservations`, this.getAuthHeaders());
  }
  getQuarterlyCourseReservations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/statistics/QuarterlyCourseReservations`, this.getAuthHeaders());
  }
  getYearlyCourseReservations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/statistics/YearlyCourseReservations`, this.getAuthHeaders());
  }
  


  getTopWorkoutPrograms(): Observable<any> {
    return this.http.get(`${this.apiUrl}/statistics/topPrograms`, this.getAuthHeaders());
  }

  getCustomerDemographics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/statistics/customerDemographics`, this.getAuthHeaders());
  }

  getRevenueOverTime(): Observable<any> {
    return this.http.get(`${this.apiUrl}/statistics/revenueOverTime`, this.getAuthHeaders());
  }

  getOrdersOverTime(): Observable<any> {
    return this.http.get(`${this.apiUrl}/statistics/ordersOverTime`, this.getAuthHeaders());
  }

  getStoresOverTime(): Observable<any> {
    return this.http.get(`${this.apiUrl}/statistics/coachesOverTime`, this.getAuthHeaders());
  }

  
}
