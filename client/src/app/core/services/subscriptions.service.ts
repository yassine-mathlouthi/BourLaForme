import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  private apiUrl = 'http://localhost:3000/api/pourlaforme';

  constructor(private http: HttpClient) { }

  // Method to fetch subscription types
  getSubscriptionTypes(): Observable<any> {
    return this.http.get(this.apiUrl+"/subscriptionTypes");
  }
  getNewUsers(): Observable<any> {
    return this.http.get(this.apiUrl+"/users/nonvalidated");
  }
  validateUser(userID: any,subsTypeId: any,date:any): Observable<any> {
    return this.http.post(this.apiUrl+"/validateUser/"+userID+"/"+subsTypeId,date);
  }
  getAllValidatedUsers(): Observable<any> {
    return this.http.get(this.apiUrl+"/users/validated");
  }
  DeleteUser(id:any):Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/deleteUser/${id}`);
  }
  ExtendSubscription(id:any,data:any):Observable<any> {
    return this.http.put(`${this.apiUrl}/subscription/updateSubscription/${id}`,data);
  }
}
