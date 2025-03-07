import { Routes } from '@angular/router';
import { AdminModule } from './modules/admin/admin.module';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },

    { 
        path: 'admin', 
        loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) 
      }
];
