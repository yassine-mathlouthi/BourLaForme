import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelect, MatSelectModule } from '@angular/material/select';  // Required for mat-select
import { MatFormFieldModule } from '@angular/material/form-field';  // Required for mat-form-field
import { MatInputModule } from '@angular/material/input';  // Required for matInput

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [ 
    MatStepperModule,
    CommonModule,            // Import CommonModule
    ReactiveFormsModule,     // Import ReactiveFormsModule for forms
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,  // Add MatFormFieldModule here
    MatInputModule   ,
    MatButtonModule ,
    MatOption,
    MatSelect
  ],
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  CourseForm: FormGroup;
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    
    nomCourse: ['', [Validators.required, Validators.minLength(3)]],        // Course name
    instructorName: ['', [Validators.required, Validators.minLength(3)]],   // Instructor name
    duration: ['', [Validators.required]],         // Course duration
  });

  secondFormGroup = this._formBuilder.group({
    level: ['', [Validators.required]],                                      // Course level (e.g., Beginner, Intermediate, Advanced)
    schedule: ['', [Validators.required, Validators.minLength(3)]],         // Course schedule (e.g., Mon/Wed/Fri, 6:00 PM)
    prix: [null, [Validators.required, Validators.min(0)]],                  // Price
  });

  thirdFormGroup = this._formBuilder.group(
    {
      imageProduit: [''],                                                      // Image URL
      courseDescription: ['', [Validators.required, Validators.maxLength(500)]], // Description
    },
  );

  isLinear = false;

  constructor(private fb: FormBuilder, private _snacBar: MatSnackBar) {
    this.CourseForm = this.fb.group({
    });
  }

  onAddCourse() {
    if (this.CourseForm.valid) {
      // Handle form submission logic here
      console.log(this.CourseForm.value);
      // Display a success message using SnackBar
      this._snacBar.open('Course added successfully!', 'Close', { duration: 3000 });
    } else {
      // Handle form validation error case
      this._snacBar.open('Please fill all required fields correctly!', 'Close', { duration: 3000 });
    }
  }
}
