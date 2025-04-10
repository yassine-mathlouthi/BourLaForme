import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Importation ajoutée
import {WorkoutRecommendationComponent } from './workout-recommendation/workout-recommendation.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AdherentRoutingModule } from './adherent-routing.module';


@NgModule({
  declarations: [
    WorkoutRecommendationComponent
  ],
  imports: [
    CommonModule,
    AdherentRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule, 
  ],
  exports: [WorkoutRecommendationComponent]
})
export class AdherentModule { }
