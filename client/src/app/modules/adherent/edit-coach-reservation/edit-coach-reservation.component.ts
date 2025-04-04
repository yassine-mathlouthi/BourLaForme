import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { AdherentService } from '../../../core/services/adherent.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-edit-coach-reservation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './edit-coach-reservation.component.html',
  styleUrl: './edit-coach-reservation.component.css'
})
export class EditCoachReservationComponent implements OnInit {
  editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _adherentService: AdherentService,
    private dialogRef: MatDialogRef<EditCoachReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data,'aaaaaaaaaaaa')
    this.editForm = this.fb.group({
      date: [this.data.date, Validators.required],
      time: [this.data.time, Validators.required]
    });
  }

  onSave() {
    if (this.editForm.valid) {
      const updatedBooking = {
        date: this.editForm.value.date,
        time: this.editForm.value.time
      };

      this._adherentService.updateCoachReservation(this.data._id, updatedBooking).subscribe(() => {
        this._snackBar.open('Reservation updated successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.dialogRef.close(true);
      });
    } else {
      this._snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    }
  }
}
