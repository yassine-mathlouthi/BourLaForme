import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reserver-coach-dialog',
  standalone: true,
  imports: [ 
    CommonModule,            
    ReactiveFormsModule,     
    MatFormFieldModule,  
    MatInputModule,   
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './reserver-coach-dialog.component.html',
  styleUrl: './reserver-coach-dialog.component.css'
})
export class ReserverCoachDialogComponent {
  bookingForm: FormGroup;
  private _formBuilder = inject(FormBuilder);

  constructor(private fb: FormBuilder, private _snacBar: MatSnackBar) {
    this.bookingForm = this.fb.group({
      date: ['', Validators.required],  // Date selection
      time: ['', Validators.required]   // Time selection
    });
  }

  onBookCoach() {
    if (this.bookingForm.valid) {
      const bookingData = {
        date: this.bookingForm.value.date,
        time: this.bookingForm.value.time
      };

      console.log('Booking Data:', bookingData);
      this._snacBar.open('Coach reservation confirmed!', 'Close', { duration: 3000 });
    }
  }
}
