import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoachesService {
  private apiUrl = 'http://localhost:3000/api/pourlaforme';

  constructor(private http: HttpClient) {}

  // Centralized method for auth headers
  private getAuthHeaders() {
    const token = sessionStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getNewCoaches(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/nonvalidatedcoachs`, this.getAuthHeaders());
  }

  ValidateCoach(id: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/validateUser/${id}`, {}, this.getAuthHeaders());
  }

  DeleteUser(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/deleteUser/${id}`, this.getAuthHeaders());
  }

  getAllCoachingDemandes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/demandesCoaching`, this.getAuthHeaders());
  }

  acceptCochingDemande(idReservation: any, status: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/demandesCoaching/${idReservation}`, status, this.getAuthHeaders());
  }

  getAllAcceptedReservationDemandes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/demandesCoaching/AcceptedReservations`, this.getAuthHeaders());
  }

  getAllCoaches(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profilsCoachs`, this.getAuthHeaders());
  }

  reservationCoach(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservationCoach`, data, this.getAuthHeaders());
  }

  getProfileInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/CoachProfile`, this.getAuthHeaders());
  }

  updateProfile(body: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/CoachProfile`, body, this.getAuthHeaders());
  }
}
