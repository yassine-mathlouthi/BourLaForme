import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileDialogueComponent } from './edit-profile-dialogue.component';

describe('EditProfileDialogueComponent', () => {
  let component: EditProfileDialogueComponent;
  let fixture: ComponentFixture<EditProfileDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfileDialogueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProfileDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
