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
import { NgModel } from '@angular/forms';
import { SubscriptionsService } from '../../../../core/services/subscriptions.service';
import { subscriptionService } from '../../services/subscription.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    HttpClientModule,
    MatIconModule, MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule,
    MatTableModule, MatPaginatorModule, CommonModule, MatOptionModule, MatSortModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements AfterViewInit,OnInit {
  USER_DATA:any[] =[]
  dataSource = new MatTableDataSource<User>(this.USER_DATA);

  constructor(private _subsService:SubscriptionsService,private snackBar:MatSnackBar){}

  data : any
  subscriptionType : any[] | undefined
  displayedColumns: string[] = ['email', 'nom', 'prenom','validation','phone'];
  
  selectedUser: User | null = null;
  subscriptionStartDate?: Date ;
  subscriptionEndDate: Date | null = null;
  selectedSubscriptionType: { id: string; name: string } | null = null;

  sortOptions = [{ value: 'email', viewValue: 'email' }];
  selectedSortOption = "email";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  users:any
  ngOnInit(): void {
    this._subsService.getSubscriptionTypes().subscribe(
      (response) => {
        this.data=response
      },
      (error) => {
        console.error('Error fetching subscription types:', error);
      }
    );
    this._subsService.getNewUsers().subscribe(
      response=>{
        this.USER_DATA = response.users;
        this.dataSource.data = this.USER_DATA; 
        console.log(this.dataSource.data)
      }
    )
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



  onSortOptionChange() {
    if (this.sort) {
      this.sort.active = this.selectedSortOption;
      this.sort.sortChange.emit();
    }
  }

  openDrawer(user: User) {
    this.selectedUser = user;
    console.log(this.selectedUser)
  }

  updateSubscriptionDate(event: any, type: string) {
    if (type === 'start') {
      // Ensure the start date is a Date object
      this.subscriptionStartDate = new Date(event.value);
    
      // Automatically set the end date based on the subscription type
      if (this.selectedSubscriptionType!.name === 'Mensuel') {
        this.subscriptionEndDate = this.addMonths(this.subscriptionStartDate!, 1); // 1 month for Mensuel
      } else if (this.selectedSubscriptionType!.name === 'Annuel') {
        this.subscriptionEndDate = this.addMonths(this.subscriptionStartDate!, 12); // 12 months for Annuel
      } else if (this.selectedSubscriptionType!.name === 'Trimestriel') {
        this.subscriptionEndDate = this.addMonths(this.subscriptionStartDate!, 3); // 3 months for Trimestriel
      }
    } 
  }
  
  
  
  // Utility function to add months to a date
  addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  }
  
  @ViewChild('drawer') drawer!: MatDrawer;

  confirmSubscription() {
    if (this.selectedUser && this.selectedSubscriptionType && this.subscriptionStartDate) {
      const subscriptionData = {
        subscriptionType: this.selectedSubscriptionType.id, // Send only the ID
        startDate: this.subscriptionStartDate,
        endDate: this.subscriptionEndDate
      };
  
      this._subsService.validateUser(this.selectedUser._id, this.selectedSubscriptionType.id, subscriptionData)
        .subscribe(
          (response) => {
            console.log('Subscription confirmed:', response);
            
            // Show success message
            this.snackBar.open('Subscription confirmed!', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['success-snackbar'] // Optional styling
            });
  
            // Close the drawer
            this.drawer.close();
  
            // Refresh the table data
            this.refreshTable();
          },
          (error) => {
            console.error('Error confirming subscription:', error);
            this.snackBar.open('Failed to confirm subscription', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        );
    } else {
      this.snackBar.open('Please fill in all fields', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar']
      });
    }
  }
  refreshTable() {
    this._subsService.getNewUsers().subscribe(
      (response) => {
        this.USER_DATA = response.users;
        this.dataSource.data = this.USER_DATA; 
        console.log('Table refreshed:', this.USER_DATA);
      },
      (error) => {
        console.error('Error refreshing table data:', error);
      }
    );
  }
  
}

export interface User {
  _id:string;
  nom: string;
  email: string;
  prenom: string;
}




