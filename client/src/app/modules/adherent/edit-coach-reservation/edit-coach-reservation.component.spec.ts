import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoachReservationComponent } from './edit-coach-reservation.component';

describe('EditCoachReservationComponent', () => {
  let component: EditCoachReservationComponent;
  let fixture: ComponentFixture<EditCoachReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCoachReservationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCoachReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
