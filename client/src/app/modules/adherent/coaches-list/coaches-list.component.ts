import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoachesService } from '../../../core/services/coaches.service';
import { ReserverCoachDialogComponent } from '../reserver-coach-dialog/reserver-coach-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-coaches-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule], // Added necessary imports
  templateUrl: './coaches-list.component.html',
  styleUrl: './coaches-list.component.css'
})
export class CoachesListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private _coachesService: CoachesService
  ) {}

  data: any;

  ngOnInit(): void {
    this._coachesService.getAllCoaches().subscribe({
      next: (r: any) => {
        console.log(r);
        this.data = r.coachs; // Match your API response key 'coachs'
      },
      error: (error) => {
        console.error('Error fetching coaches:', error);
      }
    });
  }

  openDialog(coach: any) {
    console.log("Opening dialog for coach:", coach);
    const dialogRef = this.dialog.open(ReserverCoachDialogComponent, {
      width: '500px',
      data: coach // Pass the selected coach data to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dialog closed with result:', result);
        // Handle the result if needed (e.g., refresh the list)
      }
    });
  }
}