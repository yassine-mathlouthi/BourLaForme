import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoachesService {
  private apiUrl = 'http://localhost:3000/api/pourlaforme';

  constructor(private http: HttpClient) { }
  getNewCoaches(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/nonvalidatedcoachs`);
  }
  ValidateCoach(id:any): Observable<any> {
    return this.http.put(`${this.apiUrl}/validateUser/${id}`,{});
  }
  DeleteUser(id:any):Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/deleteUser/${id}`);
  }
  getAllCoachingDemandes():Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Assuming Bearer token authentication
    });
    return this.http.get(`${this.apiUrl}/demandesCoaching`, { headers });
  }
  acceptCochingDemande(idReservation:any,status:any){
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Assuming Bearer token authentication
    });
    return this.http.put(`${this.apiUrl}/demandesCoaching/${idReservation}`,status, { headers });
  }
  getAllAcceptedReservationDemandes(){
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Assuming Bearer token authentication
    });
    return this.http.get(`${this.apiUrl}/demandesCoaching/AcceptedReservations`, { headers });
  }
  getAllCoaches(){
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Assuming Bearer token authentication
    });
    return this.http.get(`${this.apiUrl}/profilsCoachs`, { headers });
  }
  reservationCoach(data : any){
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Assuming Bearer token authentication
    });
    return this.http.post(`${this.apiUrl}/reservationCoach`,data, { headers });
  }
  getProfileInfo(){
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Assuming Bearer token authentication
    });
    return this.http.get(`${this.apiUrl}/CoachProfile`, { headers })
  }
  updateProfile(body:any){
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Assuming Bearer token authentication
    });
    return this.http.put(`${this.apiUrl}/CoachProfile`,body, { headers })
  }
  
}
