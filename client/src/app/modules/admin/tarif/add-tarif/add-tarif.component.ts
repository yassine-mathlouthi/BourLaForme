import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { SubscriptionsService } from '../../../../core/services/admin.service';

@Component({
  selector: 'app-add-tarif',
  standalone: true,
  imports: [ 
    MatIcon,
    MatStepperModule,
    CommonModule,            // Import CommonModule
    ReactiveFormsModule,     // Import ReactiveFormsModule for forms
    MatFormFieldModule,  // Add MatFormFieldModule here
    MatInputModule   ,
    MatButtonModule ,
    MatOption,
    MatSelect
  ],
  templateUrl: './add-tarif.component.html',
  styleUrl: './add-tarif.component.css'
})
export class AddTarifComponent {
  constructor(private _subscriptionService:SubscriptionsService,private _snacBar:MatSnackBar,private fb: FormBuilder,public dialogRef: MatDialogRef<AddTarifComponent>,
    ){
    this.TarifFormGroup = this.fb.group({
      name: [''],
      duration: [''],
      price: [''],
      description: ['']
    });
  }
  private _formBuilder = inject(FormBuilder);

  TarifFormGroup = this._formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],        // Course name
    price: ['', [Validators.required, Validators.minLength(3)]],   // Instructor name
    duration: ['', [Validators.required]],
    description: ['', [Validators.required]],       
  });
  onAddTarif() {
    if (this.TarifFormGroup.valid) {
     
      console.log(this.TarifFormGroup.value,'data')
      // Make the API request
      this._subscriptionService.AddTarif(this.TarifFormGroup.value).subscribe(
        (response) => {
          console.log('Course added successfully:', response);
          this._snacBar.open('Course added successfully!', 'Close', { duration: 3000 });
          this.dialogRef.close();  // Close the dialog after success
        },
        (error) => {
          console.error('Error adding course:', error);
          this._snacBar.open('Error adding course. Please try again.', 'Close', { duration: 3000 });
        }
      );
    } else {
      this._snacBar.open('Please fill all required fields correctly!', 'Close', { duration: 3000 });
    }
  }

}
