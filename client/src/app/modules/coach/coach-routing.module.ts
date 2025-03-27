import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachDashboardComponent } from './coach-dashboard/coach-dashboard.component';
import path from 'path';
import { AdminDashboardComponent } from '../admin/admin-dashboard/admin-dashboard.component';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  {path: '', 
    component: LayoutComponent,
    children: [
      { path: 'myspace', pathMatch: 'full', component: CoachDashboardComponent },
    ],}

];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachRoutingModule { }
