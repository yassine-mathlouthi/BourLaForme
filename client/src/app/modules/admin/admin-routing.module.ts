import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './acounts/accounts-management/main.component';
import { CoachesManagementComponent } from './acounts/coaches-management/coaches-management.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CoursesManagementComponent } from './courses/courses-management/courses-management.component';
import { LayoutComponent } from './layout/layout.component';
import { SubscriptionManagementComponent } from './subscription-management/subscription-management.component';
import { TarifManagementComponent } from './tarif/tarif-management/tarif-management.component';

const routes: Routes = [
  {
    path: '', 
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', component: AdminDashboardComponent },
      { path: 'dashboard', component: AdminDashboardComponent  },
      { path: 'Subscription', component: SubscriptionManagementComponent },
      { path: 'courses', component: CoursesManagementComponent },
      { path: 'accounts', component: MainComponent },
      { path: 'coaches', component: CoachesManagementComponent },
      { path: 'tarif', component: TarifManagementComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
