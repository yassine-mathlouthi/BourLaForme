import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { SubscriptionManagementComponent } from './subscription-management/subscription-management.component';

const routes: Routes = [
  {path: '', 
  component: LayoutComponent,
  children: [

    { path: 'dashboard', component: AdminDashboardComponent ,  },
    { path: 'subs', component: SubscriptionManagementComponent ,},
    //{ path: 'stores', component: StoreManagementComponent ,canActivate: [roleGuard]},
  ],}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
 