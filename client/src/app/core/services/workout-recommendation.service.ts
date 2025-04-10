import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface WorkoutRecommendationRequest {
  Age: number;
  Gender: string;
  Weight: number;
  Height: number;
  Max_BPM: number;
  Avg_BPM: number;
  Resting_BPM: number;
  Session_Duration: number;
  Calories_Burned: number;
  Fat_Percentage: number;
  Water_Intake: number;
  Workout_Frequency: number;
  Experience_Level: number;
  BMI: number;
}

interface WorkoutRecommendationResponse {
  recommended_workout_type: number;
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutRecommendationService {
  private apiUrl = 'http://localhost:8000/predict'; // Adjust if your backend runs on a different port

  constructor(private http: HttpClient) {}

  getRecommendation(data: WorkoutRecommendationRequest): Observable<WorkoutRecommendationResponse> {
    return this.http.post<WorkoutRecommendationResponse>(this.apiUrl, data);
  }
}