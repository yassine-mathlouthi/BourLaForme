import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditCoachReservationComponent } from '../edit-coach-reservation/edit-coach-reservation.component';

@Component({
  selector: 'app-my-coaches',
  standalone: true,
  imports: [],
  templateUrl: './my-coaches.component.html',
  styleUrl: './my-coaches.component.css'
})
export class MyCoachesComponent {
  
  constructor(
    private dialog: MatDialog,
  ) {}
  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditCoachReservationComponent, {
      width: '500px',
    });
  }
}
