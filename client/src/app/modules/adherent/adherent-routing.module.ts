import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachesListComponent } from './coaches-list/coaches-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { MyCoachesComponent } from './my-coaches/my-coaches.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { ReserverCourseComponent } from './reserver-course/reserver-course.component';

const routes: Routes = [
  {path: '', 
    component: LayoutComponent,
    children: [
      { path: 'myspace', pathMatch: 'full', component: DashboardComponent },
      { path: 'course', pathMatch: 'full', component: ReserverCourseComponent },
      { path: 'MyCourse', pathMatch: 'full', component: MyCoursesComponent },
      { path: 'coaches', pathMatch: 'full', component: CoachesListComponent },
      { path: 'Mycoaches', pathMatch: 'full', component: MyCoachesComponent },




    ],}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdherentRoutingModule { }
