import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachDashboardComponent } from './coach-dashboard/coach-dashboard.component';
import path from 'path';
import { AdminDashboardComponent } from '../admin/admin-dashboard/admin-dashboard.component';


const routes: Routes = [
  {path: 'myspace',
  component: CoachDashboardComponent

}];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachRoutingModule { }
