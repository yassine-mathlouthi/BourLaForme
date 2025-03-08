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
import { CoursesService } from '../../../../core/services/courses.service';
import { MatDialogRef } from '@angular/material/dialog';

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
    
    name: ['', [Validators.required, Validators.minLength(3)]],        // Course name
    coachName: ['', [Validators.required, Validators.minLength(3)]],   // Instructor name
    duration: ['', [Validators.required]],         // Course duration
  });

  secondFormGroup = this._formBuilder.group({
    level: ['', [Validators.required]],                                      // Course level (e.g., Beginner, Intermediate, Advanced)       // Course schedule (e.g., Mon/Wed/Fri, 6:00 PM)
    price: [null, [Validators.required, Validators.min(0)]], 
    availableSeats: [null, [Validators.required, Validators.min(0)]],                  // Price
  });

  thirdFormGroup = this._formBuilder.group(
    {
      schedule: ['', [Validators.required, Validators.minLength(3)]],   
      image: [''],                                                      // Image URL
      description: ['', [Validators.required, Validators.maxLength(500)]], // Description
    },
  );

  isLinear = false;

  constructor(private fb: FormBuilder, private _snacBar: MatSnackBar,private _course:CoursesService, private dialogRef: MatDialogRef<AddCourseComponent>) {
    this.CourseForm = this.fb.group({
    });
  }

  onAddCourse() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
      const courseData = {
        name: this.firstFormGroup.value.name,
        coachName: this.firstFormGroup.value.coachName,
        duration: this.firstFormGroup.value.duration,
        level: this.secondFormGroup.value.level,
        price: this.secondFormGroup.value.price,
        availableSeats: this.secondFormGroup.value.availableSeats,
        schedule: this.thirdFormGroup.value.schedule,
        image: this.thirdFormGroup.value.image,
        description: this.thirdFormGroup.value.description,
      };
  
      console.log("Submitting course data:", courseData);
      
      this._course.addCourse(courseData).subscribe(response => {
        console.log("Course added successfully:", response);
        this._snacBar.open('Course added successfully!', 'Close', { duration: 3000 });
  
        // Refresh the course list (Assuming you have a method like getCourses())
   
        // Close the dialog (If using MatDialog)
        this.dialogRef.close();
      });
  
    } else {
      this._snacBar.open('Please fill all required fields correctly!', 'Close', { duration: 3000 });
    }
  }
  
  
}
