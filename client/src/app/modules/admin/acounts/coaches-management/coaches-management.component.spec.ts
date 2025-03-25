import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachesManagementComponent } from './coaches-management.component';

describe('CoachesManagementComponent', () => {
  let component: CoachesManagementComponent;
  let fixture: ComponentFixture<CoachesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachesManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoachesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
