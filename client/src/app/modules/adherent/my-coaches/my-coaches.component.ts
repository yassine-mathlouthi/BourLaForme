import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AdherentService } from '../../../core/services/adherent.service';
import { EditCoachReservationComponent } from '../edit-coach-reservation/edit-coach-reservation.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-coaches',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './my-coaches.component.html',
  styleUrl: './my-coaches.component.css'
})
export class MyCoachesComponent implements OnInit {
  BookedCoaches: any[] = [];

  constructor(
    private _adherentService: AdherentService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._adherentService.getMyBookedCoaches().subscribe((r: any) => {
      this.BookedCoaches = r.reservations;
      console.log(r);
    });
  }

  openEditDialog(booking: any): void {
    const dialogRef = this.dialog.open(EditCoachReservationComponent, {
      width: '500px',
      data: booking
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._snackBar.open('Reservation updated successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.ngOnInit(); // Reload bookings
      }
    });
  }

  cancelReservation(id: any) {
    this._adherentService.cancelCoachReservation(id).subscribe((r) => {
      console.log(r);
      this._snackBar.open('Reservation cancelled.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      // 🔄 Refresh reservations list
      this.ngOnInit();
    });
  }
  
}
