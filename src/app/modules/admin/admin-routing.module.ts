import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {path: '', 
  component: LayoutComponent,
  children: [

    { path: 'dashboard', component: AdminDashboardComponent ,  },
    //{ path: 'orders', component: OrderManagementComponent ,canActivate: [roleGuard]},
    //{ path: 'stores', component: StoreManagementComponent ,canActivate: [roleGuard]},
  ],}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
 