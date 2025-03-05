import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NavbarComponent } from '../../main-layout/navbar/navbar.component';


@NgModule({
  declarations: [],
  imports: [NavbarComponent,
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
