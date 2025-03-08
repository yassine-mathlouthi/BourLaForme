import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatError, MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { CoursesService } from '../../../../core/services/courses.service';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [MatStepperModule,
    CommonModule,            // Import CommonModule
    ReactiveFormsModule,     // Import ReactiveFormsModule for forms
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,  // Add MatFormFieldModule here
    MatInputModule  ,
    MatButtonModule ,
    MatOption,
    MatSelect,],
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
    // Initialize form with the existing course data
    this.courseForm = this.fb.group({
      name: [data.name, [Validators.required]],
      coachName: [data.coachName, [Validators.required]],
      duration: [data.duration, [Validators.required]],
      level: [data.level, [Validators.required]],
      price: [data.price, [Validators.required, Validators.min(0)]],
      availableSeats: [data.availableSeats, [Validators.required, Validators.min(0)]],
      schedule: [data.schedule, [Validators.required]],
      image: [data.image],
      description: [data.description, [Validators.required, Validators.maxLength(500)]]
    });
  }

  // On Submit, update the course
  edit() {
    if (this.courseForm.valid) {
      const updatedCourse = this.courseForm.value;
      console.log("hereeeeeee",this.data)
      this._coursesService.updateCourse(this.data._id, updatedCourse).subscribe(
        (response) => {
          console.log("hereeeeeee",this.data)
          this._snackBar.open('Course updated successfully!', 'Close', { duration: 3000 });
          this.dialogRef.close(true); // Close dialog and pass success flag
        },
        (error) => {
          this._snackBar.open('Error updating course!', 'Close', { duration: 3000 });
        }
      );
    }
  }

  // Close the dialog
  onClose(): void {
    this.dialogRef.close();
  }
}
