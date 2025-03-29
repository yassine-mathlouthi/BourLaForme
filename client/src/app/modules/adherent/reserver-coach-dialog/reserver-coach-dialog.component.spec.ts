import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserverCoachDialogComponent } from './reserver-coach-dialog.component';

describe('ReserverCoachDialogComponent', () => {
  let component: ReserverCoachDialogComponent;
  let fixture: ComponentFixture<ReserverCoachDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReserverCoachDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReserverCoachDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
