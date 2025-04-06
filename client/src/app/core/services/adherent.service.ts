import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdherentService {
  private apiUrl = 'http://localhost:3000/api/pourlaforme';

  constructor(private http: HttpClient) {}

  // Centralized method for token headers
  private getAuthHeaders() {
    const token = sessionStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getMyBookedCoaches() {
    return this.http.get(`${this.apiUrl}/reservationCoach`, this.getAuthHeaders());
  }

  cancelCoachReservation(id: any) {
    return this.http.delete(`${this.apiUrl}/reservationCoach/${id}`, this.getAuthHeaders());
  }

  updateCoachReservation(id: any, updatedBooking: any) {
    return this.http.put(`${this.apiUrl}/reservationCoach/${id}`, updatedBooking, this.getAuthHeaders());
  }

  getMySubscriptionDetails() {
    return this.http.get(`${this.apiUrl}/followSubscription`, this.getAuthHeaders());
  }

  getNotifications() {
    return this.http.get(`${this.apiUrl}/NotificationsForUser`, this.getAuthHeaders());
  }

  updateNotificationStatus(id: any) {
    console.log("hereee", sessionStorage.getItem('token'));
    return this.http.put(`${this.apiUrl}/NotificationsForUser/${id}`, {}, this.getAuthHeaders());
  }
}
