import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CoachesService } from '../../../core/services/coaches.service';

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
    MatNativeDateModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './reserver-coach-dialog.component.html',
  styleUrl: './reserver-coach-dialog.component.css'
})
export class ReserverCoachDialogComponent {
  bookingForm: FormGroup;

  constructor(
    private _coachService: CoachesService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public coachData: any,
    private dialogRef: MatDialogRef<ReserverCoachDialogComponent>
  ) {
    this.bookingForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  onBookCoach() {
    if (this.bookingForm.valid) {
      const bookingData = {
        coachId: this.coachData,
        date: this.bookingForm.value.date,
        time: this.bookingForm.value.time
      };

      this._coachService.reservationCoach(bookingData).subscribe({
        next: (res) => {
          console.log('Booking successful:', res);
          this._snackBar.open(
            `Réservé avec succès`,
            'Fermer',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }
          );
          this.dialogRef.close(true); // Close the dialog after successful reservation
        },
        error: (err) => {
          console.error('Booking error:', err);
          this._snackBar.open(
            `Erreur lors de la réservation.`,
            'Fermer',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }
          );
        }
      });
    } else {
      this._snackBar.open(
        'Veuillez remplir tous les champs requis.',
        'Fermer',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        }
      );
    }
  }
}
