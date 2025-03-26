import { CommonModule } from '@angular/common';
import { AfterViewInit,OnInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SubscriptionsService } from '../../../../core/services/subscriptions.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoachesService } from '../../../../core/services/coaches.service';
@Component({
  selector: 'app-coaches-management',
  standalone: true,
  imports: [
    HttpClientModule,
    MatIconModule, MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule,
    MatTableModule, MatPaginatorModule, CommonModule, MatOptionModule, MatSortModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule
  ],
  templateUrl: './coaches-management.component.html',
  styleUrl: './coaches-management.component.css'
})


export class CoachesManagementComponent implements AfterViewInit,OnInit {
  USER_DATA:any[] =[]
  dataSource = new MatTableDataSource<Coach>(this.USER_DATA);

  constructor(private snackBar:MatSnackBar , private _coachesService:CoachesService){}
  displayedColumns: string[] = ['email', 'nom', 'prenom','phone','specialty','bio','validation'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  users:any
  coachesData:any

  ngOnInit(): void {
    this._coachesService.getNewCoaches().subscribe(
      (response) => {
        this.USER_DATA=response.users
        this.dataSource.data = this.USER_DATA; 
        console.log(this.USER_DATA)
      },
      (error) => {
        console.error('Error fetching subscription types:', error);
      }
    );
  
    
    
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  validateCoach(id:any){
    this._coachesService.ValidateCoach(id).subscribe(r=>{console.log(r)})

  }
  

}
export interface Coach {
  _id:string;
  nom: string;
  email: string;
  prenom: string;
  phone:string;
  specialty:string;
  bio:string;
}
