import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReserverCoachDialogComponent } from '../reserver-coach-dialog/reserver-coach-dialog.component';

@Component({
  selector: 'app-coaches-list',
  standalone: true,
  imports: [],
  templateUrl: './coaches-list.component.html',
  styleUrl: './coaches-list.component.css'
})
export class CoachesListComponent {
  constructor( private dialog: MatDialog,){}
  openDialog() {
    console.log("dialog ref")
    const dialogRef = this.dialog.open(ReserverCoachDialogComponent, {
      width: '500px',
      /* data: course */
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        
      }
    });
  }
}
