import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },

  { 
    path: 'admin', 
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [authGuard], 
    data: { role: 'admin' }  
  },
  { 
    path: 'coach', 
    loadChildren: () => import('./modules/coach/coach.module').then(m => m.CoachModule),
    canActivate: [authGuard], 
    data: { role: 'coach' }  
  },
   
  {path: 'adherent', 
  loadChildren: () => import('./modules/adherent/adherent.module').then(m => m.AdherentModule),
  canActivate: [authGuard], 
  data: { role: 'adherent' }  
},



  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
