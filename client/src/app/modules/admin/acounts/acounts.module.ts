import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcountsRoutingModule } from './acounts-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
    AcountsRoutingModule
  ]
})
export class AcountsModule { }
