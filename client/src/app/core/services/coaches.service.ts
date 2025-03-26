import { HttpClient } from '@angular/common/http';
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
    return this.http.put(`${this.apiUrl}/users/nonvalidatedcoachs/${id}`,1);
  }






}
