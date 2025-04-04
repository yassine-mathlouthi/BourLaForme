import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdherentService {
  private apiUrl = 'http://localhost:3000/api/pourlaforme';
  constructor(private http: HttpClient) { }
  getMyBookedCoaches(){
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Assuming Bearer token authentication
    });
    return this.http.get(`${this.apiUrl}/reservationCoach`, { headers });
  }
  cancelCoachReservation(id:any){
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Assuming Bearer token authentication
    });
    return this.http.delete(`${this.apiUrl}/reservationCoach/${id}`, { headers });
  }
  updateCoachReservation(id:any,updatedBooking:any){
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Assuming Bearer token authentication
    });
    return this.http.put(`${this.apiUrl}/reservationCoach/${id}`,updatedBooking, { headers });
  }
  
}
