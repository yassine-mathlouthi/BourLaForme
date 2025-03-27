import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SubscriptionsService } from '../../../../core/services/subscriptions.service';
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
import { AddTarifComponent } from '../add-tarif/add-tarif.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tarif-management',
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
  templateUrl: './tarif-management.component.html',
  styleUrls: ['./tarif-management.component.css']
})
export class TarifManagementComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private _subscriptionService: SubscriptionsService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,

  ) {
    // Initialize the FormGroup with empty values
    this.tarifFormGroup = this.fb.group({
      name: [''],
      duration: [''],
      price: [''],
      description: ['']
    });
  }

  Tarif: Tarif[] = [];
  dataSource = new MatTableDataSource<Tarif>(this.Tarif);
  displayedColumns: string[] = ['name', 'duration', 'price', 'description', 'validation'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  editingRowId: string | null = null;
  tarifFormGroup: FormGroup;

  ngOnInit(): void {
    this._subscriptionService.getSubscriptionTypes().subscribe(r => {
      this.Tarif = r;
      this.dataSource.data = this.Tarif;
    });
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

  refreshTable() {
    this._subscriptionService.getSubscriptionTypes().subscribe(
      (response) => {
        this.Tarif = response.users;
        this.dataSource.data = this.Tarif;
        console.log(this.Tarif);
      },
      (error) => {
        console.error('Error fetching subscription types:', error);
      }
    );
  }

  // Start editing a row
  startEdit(row: Tarif) {
    this.editingRowId = row._id;
    // Populate the FormGroup with the row's data
    this.tarifFormGroup.setValue({
      name: row.name || '', // Ensure a default empty string if null/undefined
      duration: row.duration || 0,
      price: row.price || 0,
      description: row.description || ''
    });
  }
  x=0
  data:{
      description: string;
      duration: number;
      name: string;
      price: number;
  }
  // Save the edited row
  | undefined
  // Save the edited row
  saveEdit() {
    console.log(this.tarifFormGroup.value)
    if (this.editingRowId) {
      const updatedRow = this.tarifFormGroup.value;
      const index = this.Tarif.findIndex(t => t._id === this.editingRowId);
      if (index !== -1) {
        this.Tarif[index] = { ...this.Tarif[index], ...updatedRow };
        this.dataSource.data = [...this.Tarif]; // Refresh the table

        // Optionally, send the updated data to the server
        
        this._subscriptionService.UpdateTarif(this.editingRowId,this.tarifFormGroup.value).subscribe(
          () => {
            this._snackBar.open('Tarif updated successfully!', 'Close', { duration: 3000 });
          },
          (error) => {
            console.error('Error updating tarif:', error);
            this._snackBar.open('Failed to update tarif.', 'Close', { duration: 3000 });
          }
        );
      }
    }
    this.cancelEdit();
  }

  // Cancel editing
  cancelEdit() {
    this.editingRowId = null;
    this.tarifFormGroup.reset(); // Reset the form
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddTarifComponent, {
      width: '500px',
      
      /* data: null */
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._subscriptionService.getSubscriptionTypes().subscribe((data: any[]) => {
          this.Tarif = data;
        });
      }
    });
  }
}

export interface Tarif {
  _id: string;
  description: string;
  duration: number;
  name: string;
  price: number;
}