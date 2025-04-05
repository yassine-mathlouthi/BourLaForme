import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CoachesService } from '../../../core/services/coaches.service';

@Component({
  selector: 'app-edit-profile-dialogue',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './edit-profile-dialogue.component.html',
  styleUrls: ['./edit-profile-dialogue.component.css']
})
export class EditProfileDialogueComponent {
  profileForm: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditProfileDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coachService:CoachesService
  ) {
    this.profileForm = this.fb.group({
      specialty: [data?.specialty || '', Validators.required],
      bio: [data?.bio || ''],
      image: [data?.image || '']
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const formData = new FormData();
      for (const key in this.profileForm.value) {
        formData.append(key, this.profileForm.value[key]);
      }
  
      this._coachService.updateProfile(formData).subscribe(response => {
        console.log(response);
        this.dialogRef.close(response); // Optionally close dialog with result
      });
    }
  }
  

  onCancel() {
    this.dialogRef.close();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profileForm.patchValue({ image: file });
    }
  }
  
}