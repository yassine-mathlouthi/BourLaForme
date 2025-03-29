import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserverCourseComponent } from './reserver-course.component';

describe('ReserverCourseComponent', () => {
  let component: ReserverCourseComponent;
  let fixture: ComponentFixture<ReserverCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReserverCourseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReserverCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
