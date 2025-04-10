import { TestBed } from '@angular/core/testing';

import { WorkoutRecommendationService } from './workout-recommendation.service';

describe('WorkoutRecommendationService', () => {
  let service: WorkoutRecommendationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutRecommendationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
