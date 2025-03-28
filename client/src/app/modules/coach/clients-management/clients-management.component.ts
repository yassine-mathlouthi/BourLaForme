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
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-clients-management',
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
  ],
  templateUrl: './clients-management.component.html',
  styleUrl: './clients-management.component.css'
})
export class ClientsManagementComponent {
  constructor(
    private _coachService: CoachesService,
    private _snackBar: MatSnackBar,
  ) { }
  reservations: Reservations[] = [];
  dataSource = new MatTableDataSource<Reservations>(this.reservations);
  displayedColumns: string[] = ['nom', 'prenom', 'email', 'date', 'time'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this._coachService.getAllAcceptedReservationDemandes().subscribe((r:any) => {
      console.log(r)
      this.reservations = r.formattedReservations
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
