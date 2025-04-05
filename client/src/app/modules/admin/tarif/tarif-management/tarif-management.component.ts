import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SubscriptionsService } from '../../../../core/services/admin.service';
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
    private fb: FormBuilder
  ) {
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
    this.refreshTable(); // Load initial data
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
    this._subscriptionService.getSubscriptionTypes().subscribe(
      (response: Tarif[]) => { // Assuming response is an array of Tarif
        this.Tarif = response; // Assign directly to Tarif array
        this.dataSource.data = this.Tarif; // Update the dataSource
        console.log('Table refreshed:', this.Tarif);
      },
      (error) => {
        console.error('Error fetching subscription types:', error);
        this._snackBar.open('Failed to refresh table.', 'Close', { duration: 3000 });
      }
    );
  }

  startEdit(row: Tarif) {
    this.editingRowId = row._id;
    this.tarifFormGroup.setValue({
      name: row.name || '',
      duration: row.duration || 0,
      price: row.price || 0,
      description: row.description || ''
    });
  }

  saveEdit() {
    if (this.editingRowId) {
      const updatedRow = this.tarifFormGroup.value;
      const index = this.Tarif.findIndex(t => t._id === this.editingRowId);
      if (index !== -1) {
        this.Tarif[index] = { ...this.Tarif[index], ...updatedRow };
        this.dataSource.data = [...this.Tarif];

        this._subscriptionService.UpdateTarif(this.editingRowId, this.tarifFormGroup.value).subscribe(
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

  cancelEdit() {
    this.editingRowId = null;
    this.tarifFormGroup.reset();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddTarifComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      
        this.refreshTable(); // Refresh table after adding a new tarif
      
    });
  }

  // Fixed onDeleteTarif method
  onDeleteTarif(id: string) {
    this._subscriptionService.DeleteTarif(id).subscribe(
      () => {
        this._snackBar.open('Tarif deleted successfully!', 'Close', { duration: 3000 });
        this.refreshTable(); // Refresh table after deletion
      },
      (error) => {
        console.error('Error deleting tarif:', error);
        this._snackBar.open('Failed to delete tarif.', 'Close', { duration: 3000 });
      }
    );
  }
}

export interface Tarif {
  _id: string;
  description: string;
  duration: number;
  name: string;
  price: number;
}