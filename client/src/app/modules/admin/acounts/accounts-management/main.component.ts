import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatIconModule, MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule,
    MatTableModule, MatPaginatorModule, CommonModule, MatOptionModule, MatSortModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements AfterViewInit {
  displayedColumns: string[] = ['email', 'name', 'Phone', 'validation'];
  dataSource = new MatTableDataSource<User>(USER_DATA);
  selectedUser: User | null = null;
  subscriptionStartDate: Date | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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

  sortOptions = [{ value: 'email', viewValue: 'email' }];
  selectedSortOption = "email";

  onSortOptionChange() {
    if (this.sort) {
      this.sort.active = this.selectedSortOption;
      this.sort.sortChange.emit();
    }
  }

  openDrawer(user: User) {
    this.selectedUser = user;
  }
  updateSubscriptionDate(event: any) {
    this.subscriptionStartDate = event.value;
  }
  
}

export interface User {
  name: string;
  email: string;
  phone: string;
  validation: string;
}

const USER_DATA: User[] = [
  { email: 'ahmed.benali@gmail.com', name: 'Ahmed Ben Ali', phone: '216 98 123 456', validation: 'Valid' },
  { email: 'fatma.trabelsi@yahoo.com', name: 'Fatma Trabelsi', phone: '216 55 654 321', validation: 'Pending' },
  { email: 'mohamed.said@outlook.com', name: 'Mohamed Saïd', phone: '216 97 222 333', validation: 'Valid' },
  { email: 'karim.bouaziz@hotmail.com', name: 'Karim Bouaziz', phone: '216 50 333 444', validation: 'Rejected' },
  { email: 'hiba.chahed@tnmail.com', name: 'Hiba Chahed', phone: '216 20 111 222', validation: 'Valid' },
  { email: 'yassine.jebali@gmail.com', name: 'Yassine Jebali', phone: '216 53 987 654', validation: 'Pending' },
  { email: 'leila.mrad@gmail.com', name: 'Leila Mrad', phone: '216 99 555 666', validation: 'Valid' },
  { email: 'omar.haddad@live.com', name: 'Omar Haddad', phone: '216 21 444 555', validation: 'Pending' },
  { email: 'nour.kacem@yahoo.fr', name: 'Nour Kacem', phone: '216 58 666 777', validation: 'Valid' },
  { email: 'salim.gharsalli@gmail.com', name: 'Salim Gharsalli', phone: '216 90 888 999', validation: 'Rejected' },
];

export { USER_DATA };
