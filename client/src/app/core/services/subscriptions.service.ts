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
}
