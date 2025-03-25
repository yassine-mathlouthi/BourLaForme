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
}
