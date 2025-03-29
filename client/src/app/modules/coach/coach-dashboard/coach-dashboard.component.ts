import { Component, OnInit, ViewChild } from '@angular/core';
import { CoachesService } from '../../../core/services/coaches.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-coach-dashboard',
  standalone: true,
  imports: [
    HttpClientModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    MatOptionModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  templateUrl: './coach-dashboard.component.html',
  styleUrl: './coach-dashboard.component.css'
})
export class CoachDashboardComponent implements OnInit {
  constructor(
    private _coachService: CoachesService,
    private _snackBar: MatSnackBar,
  ) { }
  reservations: Reservations[] = [];
  dataSource = new MatTableDataSource<Reservations>(this.reservations);
  displayedColumns: string[] = ['nom', 'prenom', 'email', 'date', 'time','validation'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this._coachService.getAllCoachingDemandes().subscribe(r => {
      this.reservations = r.reservations
      this.dataSource.data=this.reservations
      console.log("reservations : ", this.reservations)
    })

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Fixed refreshTable method
  refreshTable() {
    this._coachService.getAllCoachingDemandes().subscribe(
      (response) => { // Assuming response is an array of Tarif
        this.reservations = response.reservations; // Assign directly to Tarif array
        this.dataSource.data = this.reservations; // Update the dataSource
        console.log('Table refreshed:', this.reservations);
      },
      (error) => {
        console.error('Error fetching subscription types:', error);
        this._snackBar.open('Failed to refresh table.', 'Close', { duration: 3000 });
      }
    );
  }
  body: { status: string } = { status: '' }; 
  acceptReservationDemande(id:any){
    this.body.status="accepted"
    this._coachService.acceptCochingDemande(id,this.body).subscribe((r)=>{
      this._snackBar.open('Reservation accepted successfully!', 'Close', { duration: 3000 }); this.refreshTable();  console.log(r)   },(error)=>{
        console.log(error)
        this._snackBar.open('Failed!', 'Close', { duration: 3000 });
      }
    )
    

  }
  deleteReservationDemande(id:any){
    this.body.status="rejected"
    this._coachService.acceptCochingDemande(id,this.body).subscribe((r)=>{
      this._snackBar.open('Reservation accepted successfully!', 'Close', { duration: 3000 }); this.refreshTable(); console.log(r)   },(error)=>{
        console.log(error)
        this._snackBar.open('Failed!', 'Close', { duration: 3000 });
      }
    )
  }


}
export interface Reservations {
  adherent: {
    email: string,
    id: string,
    nom: string,
    prenom: string
  };
  reservation: {
    date: string,
    time: string
  }
}
