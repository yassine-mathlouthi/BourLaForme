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
    console.log('token : ',token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Assuming Bearer token authentication
    });
    return this.http.get(`${this.apiUrl}/demandesCoaching`, { headers });
  }
}
