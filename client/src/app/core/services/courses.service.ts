import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient ) { }
  private apiUrl = 'http://localhost:3000/api/pourlaforme';
  updateCourse(courseId: string, courseData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/course/${courseId}`, courseData);
  }
  addCourse(course:any): Observable<any> {
    return this.http.post(this.apiUrl+"/course",course);
  }
  getAllCourses(): Observable<any> {
    return this.http.get(this.apiUrl+"/course");
  }
  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete(this.apiUrl+"/course/"+courseId);
  }
}



