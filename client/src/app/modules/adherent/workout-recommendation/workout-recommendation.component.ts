import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkoutRecommendationService } from '../../../core/services/workout-recommendation.service';

@Component({
  selector: 'app-workout-recommendation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './workout-recommendation.component.html',
  styleUrl: './workout-recommendation.component.css'
})
export class WorkoutRecommendationComponent {
  recommendationForm: FormGroup;
  isLoading = false;
  recommendationResult: string | null = null;

  // Mapping de type d’entraînement en texte lisible
  workoutTypeMap: { [key: number]: string } = {
    0: 'Cardio',
    1: 'Force',
    2: 'HIIT',
    3: 'Yoga',
    4: 'Pilates',
    5: 'CrossFit'
  };

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutRecommendationService,
    private _snackBar: MatSnackBar
  ) {
    this.recommendationForm = this.fb.group({
      Age: [null, Validators.required],
      Gender: ['', Validators.required],
      Weight: [null, Validators.required],
      Height: [null, Validators.required],
      Max_BPM: [null, Validators.required],
      Avg_BPM: [null, Validators.required],
      Resting_BPM: [null, Validators.required],
      Session_Duration: [null, Validators.required],
      Calories_Burned: [null, Validators.required],
      Fat_Percentage: [null, Validators.required],
      Water_Intake: [null, Validators.required],
      Workout_Frequency: [null, Validators.required],
      Experience_Level: [null, Validators.required],
      BMI: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.recommendationForm.invalid) {
      this._snackBar.open('Veuillez remplir tous les champs requis.', 'Fermer', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }

    this.isLoading = true;
    const requestData = this.recommendationForm.value;

    this.workoutService.getRecommendation(requestData).subscribe({
      next: (res) => {
        const typeCode = res.recommended_workout_type;
        this.recommendationResult = this.workoutTypeMap[typeCode] || 'Type inconnu';
        this._snackBar.open('Recommandation générée avec succès !', 'Fermer', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la recommandation :', err);
        this._snackBar.open('Erreur lors de la génération.', 'Fermer', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.isLoading = false;
      }
    });
  }
}
