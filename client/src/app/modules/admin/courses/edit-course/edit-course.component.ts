import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { CoursesService } from '../../../../core/services/courses.service';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatStepperModule
  ],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent {
  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _coursesService: CoursesService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Convert the schedule from ISO string to datetime-local format
    const formattedSchedule = this.convertToLocalDate(data.schedule);

    this.courseForm = this.fb.group({
      name: [data.name, [Validators.required]],
      coachName: [data.coachName, [Validators.required]],
      duration: [data.duration, [Validators.required]],
      level: [data.level, [Validators.required]],
      price: [data.price, [Validators.required, Validators.min(0)]],
      availableSeats: [data.availableSeats, [Validators.required, Validators.min(0)]],
      schedule: [formattedSchedule, [Validators.required]],
      image: [data.image],
      description: [data.description, [Validators.required, Validators.maxLength(500)]]
    });
  }

  // Convert ISO date string to datetime-local format (yyyy-MM-ddTHH:mm)
  private convertToLocalDate(isoDate: string): string {
    const date = new Date(isoDate);
    return date.toISOString().slice(0, 16); // Format as yyyy-MM-ddTHH:mm
  }

  // Convert datetime-local back to ISO string when saving
  private convertToISODate(localDate: string): string {
    return new Date(localDate).toISOString(); // Convert to ISO string
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.courseForm.patchValue({ image: file });
    }
  }

  edit() {
    if (this.courseForm.valid) {
      const formValues = this.courseForm.value;

      // Convert the schedule to ISO string before submitting
      formValues.schedule = this.convertToISODate(formValues.schedule);

      const updatedCourse = new FormData();

      // Append all fields to FormData
      Object.keys(formValues).forEach(key => {
        if (key === 'image' && formValues[key] instanceof File) {
          updatedCourse.append(key, formValues[key], formValues[key].name);
        } else {
          updatedCourse.append(key, formValues[key]);
        }
      });

      console.log("Updating course with data:", updatedCourse);

      this._coursesService.updateCourse(this.data._id, updatedCourse).subscribe(
        () => {
          this._snackBar.open('Course updated successfully!', 'Close', { duration: 3000 });
          this.dialogRef.close(true); // Close dialog and pass success flag
        },
        (error) => {
          console.error('Error updating course:', error);
          this._snackBar.open('Error updating course!', 'Close', { duration: 3000 });
        }
      );
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
