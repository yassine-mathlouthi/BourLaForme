import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { ReserverCourseComponent } from './reserver-course/reserver-course.component';

const routes: Routes = [
  {path: '', 
    component: LayoutComponent,
    children: [
      { path: 'myspace', pathMatch: 'full', component: DashboardComponent },
      { path: 'course', pathMatch: 'full', component: ReserverCourseComponent },

    ],}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdherentRoutingModule { }
