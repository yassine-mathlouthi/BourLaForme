import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifManagementComponent } from './tarif-management.component';

describe('TarifManagementComponent', () => {
  let component: TarifManagementComponent;
  let fixture: ComponentFixture<TarifManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarifManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarifManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
