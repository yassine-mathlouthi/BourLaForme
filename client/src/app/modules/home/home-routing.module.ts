import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path:"",component:HomeComponent
  },
   { path: 'course/:id', component: CourseDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
