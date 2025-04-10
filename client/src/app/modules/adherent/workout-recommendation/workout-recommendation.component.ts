import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkoutRecommendationService } from './../../../core/services/workout-recommendation.service';

@Component({
  selector: 'app-workout-recommendation',
  templateUrl: './workout-recommendation.component.html',
  styleUrls: ['./workout-recommendation.component.css']
})
export class WorkoutRecommendationComponent implements OnInit {
  recommendationForm: FormGroup;
  recommendation: number | null = null;
  isLoading = false;
  error: string | null = null;

  workoutTypes = [
    { id: 0, name: 'Cardio' },
    { id: 1, name: 'Strength Training' },
    { id: 2, name: 'HIIT' },
    { id: 3, name: 'Yoga' },
    { id: 4, name: 'Pilates' }
  ];

  constructor(
    private fb: FormBuilder,
    private workoutRecommendationService: WorkoutRecommendationService
  ) {
    this.recommendationForm = this.fb.group({
      Age: ['', [Validators.required, Validators.min(15), Validators.max(100)]],
      Gender: ['', Validators.required],
      Weight: ['', [Validators.required, Validators.min(30), Validators.max(200)]],
      Height: ['', [Validators.required, Validators.min(100), Validators.max(250)]],
      Max_BPM: ['', [Validators.required, Validators.min(60), Validators.max(220)]],
      Avg_BPM: ['', [Validators.required, Validators.min(60), Validators.max(220)]],
      Resting_BPM: ['', [Validators.required, Validators.min(40), Validators.max(100)]],
      Session_Duration: ['', [Validators.required, Validators.min(10), Validators.max(180)]],
      Calories_Burned: ['', [Validators.required, Validators.min(50), Validators.max(1500)]],
      Fat_Percentage: ['', [Validators.required, Validators.min(5), Validators.max(50)]],
      Water_Intake: ['', [Validators.required, Validators.min(0.5), Validators.max(10)]],
      Workout_Frequency: ['', [Validators.required, Validators.min(1), Validators.max(7)]],
      Experience_Level: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      BMI: ['', [Validators.required, Validators.min(15), Validators.max(50)]]
    });
  }

  ngOnInit(): void {}


  
  onSubmit(): void {
    if (this.recommendationForm.valid) {
      this.isLoading = true;
      this.error = null;
      this.recommendation = null;

      const formData = this.recommendationForm.value;
      formData.Gender = formData.Gender.toLowerCase(); // Ensure consistent gender format

      this.workoutRecommendationService.getRecommendation(formData).subscribe({
        next: (response) => {
          this.recommendation = response.recommended_workout_type;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to get workout recommendation. Please try again.';
          this.isLoading = false;
          console.error('Error getting recommendation:', err);
        }
      });
    }
  }

  getWorkoutTypeName(id: number | null): string {
    if (id === null) return 'No recommendation yet';
    const type = this.workoutTypes.find(t => t.id === id);
    return type ? type.name : 'Unknown';
  }
}