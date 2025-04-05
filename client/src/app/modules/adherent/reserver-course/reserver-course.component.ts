import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CoursesService } from '../../../core/services/courses.service';
import { SubscriptionsService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-reserver-course',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './reserver-course.component.html',
  styleUrl: './reserver-course.component.css'
})
export class ReserverCourseComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private _coursesService: CoursesService,
    private _subscriptionService: SubscriptionsService
  ) {}

  data: any;
  Tarif: any;

  ngOnInit(): void {
    this._coursesService.getAllCourses().subscribe(r => {
      this.data = r;
      console.log(r);
    });
  }

  body: {
    courseId: string
  } = { courseId: '' };

  resrverCourse(courseId: any) {
    console.log(courseId);
    this.body.courseId = courseId;
    console.log(this.body, "json");

    this._coursesService.reserverCour(this.body).subscribe({
      next: (response) => {
        console.log(response);
        this._snackBar.open('Course reserved successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      },
      error: (error) => {
        console.error(error);
        {
          this._snackBar.open('You have already reserved this course!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        }
      }
    });
  }
}