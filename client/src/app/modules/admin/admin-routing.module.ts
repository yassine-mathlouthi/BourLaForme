import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './acounts/accounts-management/main.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CoursesManagementComponent } from './courses/courses-management/courses-management.component';
import { LayoutComponent } from './layout/layout.component';
import { SubscriptionManagementComponent } from './subscription-management/subscription-management.component';

const routes: Routes = [
  {
    path: '', 
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', component: AdminDashboardComponent },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'subs', component: SubscriptionManagementComponent },
      { path: 'courses', component: CoursesManagementComponent },
      { path: 'accounts', component: MainComponent },

    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
