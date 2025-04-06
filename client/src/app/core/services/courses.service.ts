import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

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

  updateCourse(courseId: string, courseData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/course/${courseId}`, courseData, this.getAuthHeaders());
  }

  addCourse(course: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/course`, course, this.getAuthHeaders());
  }

  getAllCourses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/course`, this.getAuthHeaders());
  }

  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/course/${courseId}`, this.getAuthHeaders());
  }

  reserverCour(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservationCourse`, body, this.getAuthHeaders());
  }

  getAllCoursesReserved(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reservationCourse`, this.getAuthHeaders());
  }
}
