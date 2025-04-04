import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IAPlanWorkoutGeneratorComponent } from './ia-plan-workout-generator.component';

describe('IAPlanWorkoutGeneratorComponent', () => {
  let component: IAPlanWorkoutGeneratorComponent;
  let fixture: ComponentFixture<IAPlanWorkoutGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IAPlanWorkoutGeneratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IAPlanWorkoutGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
