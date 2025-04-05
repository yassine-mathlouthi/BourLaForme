import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  private apiUrl = 'http://localhost:3000/api/pourlaforme';

  constructor(private http: HttpClient) { }

  private getAuthHeaders() {
    const token = sessionStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getSubscriptionTypes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/subscriptionTypes`, this.getAuthHeaders());
  }

  getNewUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/nonvalidated`, this.getAuthHeaders());
  }

  validateUser(userID: any, subsTypeId: any, date: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/validateUser/${userID}/${subsTypeId}`, date, this.getAuthHeaders());
  }

  getAllValidatedUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/validated`, this.getAuthHeaders());
  }

  DeleteUser(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/deleteUser/${id}`, this.getAuthHeaders());
  }

  ExtendSubscription(id: any, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/subscription/updateSubscription/${id}`, data, this.getAuthHeaders());
  }

  UpdateTarif(id: any, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/subscriptionTypes/${id}`, data, this.getAuthHeaders());
  }

  AddTarif(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/subscriptionTypes`, data, this.getAuthHeaders());
  }

  DeleteTarif(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/subscriptionTypes/${id}`, this.getAuthHeaders());
  }
}
