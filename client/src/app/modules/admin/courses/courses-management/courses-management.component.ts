import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import Snackbar
import { BaseChartDirective } from 'ng2-charts';
import { CoursesService } from '../../../../core/services/courses.service';
import { EditCourseComponent } from '../edit-course/edit-course.component';

@Component({
  selector: 'app-courses-management',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './courses-management.component.html',
  styleUrls: ['./courses-management.component.css'] // Corrected styleUrl to styleUrls
})
export class CoursesManagementComponent implements OnInit {
  coursesData: any;

  constructor(
    private _courses: CoursesService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar // Inject Snackbar
  ) {}

  ngOnInit(): void {
    this._courses.getAllCourses().subscribe((r) => (this.coursesData = r));
  }

  openEditDialog(course: any): void {
    const dialogRef = this.dialog.open(EditCourseComponent, {
      width: '600px',
      data: course
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._courses.getAllCourses().subscribe((data: any[]) => {
          this.coursesData = data;
        });
      }
    });
  }

  deleteCourse(courseid: any): void {
    this._courses.deleteCourse(courseid).subscribe(
      (r) => {
        console.log(r);
        this._snackBar.open('Course deleted successfully!', 'Close', {
          duration: 3000,

        });

        // Refresh the course list
        this._courses.getAllCourses().subscribe((data: any[]) => {
          this.coursesData = data;
        });
      },
      (error) => {
        console.error('Error deleting course:', error);
        this._snackBar.open('Failed to delete course', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
