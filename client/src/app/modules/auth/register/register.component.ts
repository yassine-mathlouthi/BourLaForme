import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatStepperModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  private _formBuilder = inject(FormBuilder);

  // Form Groups
  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    role: ['adherent', Validators.required], // Moved to first step
  });

  secondFormGroup = this._formBuilder.group({
    bio: [''], // Optional bio
    speciality: [''], // Optional unless role is coach
    image: [null], // Image file
  });

  thirdFormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    rePassword: ['', Validators.required],
  });

  isLinear = true; // Set to true to enforce step order
  passwordMatch = '';
  selectedImage: File | null = null;

  // Handle image selection
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
  }

  // Method to handle user registration
  registerUser() {
    const user = {
      prenom: this.firstFormGroup.value.firstName,
      nom: this.firstFormGroup.value.lastName,
      phone: this.firstFormGroup.value.phoneNumber,
      role: this.firstFormGroup.value.role,
      bio: this.secondFormGroup.value.bio,
      speciality: this.secondFormGroup.value.speciality,
      image: this.selectedImage, // Pass the file directly
      email: this.thirdFormGroup.value.email,
      password: this.thirdFormGroup.value.password,
    };

    // Regular expression for password strength
    const passwordStrengthRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const password = this.thirdFormGroup.value.password ?? '';
    const rePassword = this.thirdFormGroup.value.rePassword ?? '';

    // Password strength check
    if (!passwordStrengthRegex.test(password)) {
      this.snackBar.open(
        'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        'Close',
        { duration: 3000 }
      );
      return;
    }

    // Password match check
    if (password !== rePassword) {
      this.passwordMatch = 'Passwords do not match.';
      this.snackBar.open(this.passwordMatch, 'Close', { duration: 3000 });
      return;
    }

    // Additional validation: Speciality required for coaches
    if (user.role === 'coach' && !user.speciality) {
      this.snackBar.open('Speciality is required for coaches.', 'Close', { duration: 3000 });
      return;
    }

    // Call the service to register the user
    this.authService.register(user).subscribe(
      (response: any) => {
        if (response) {
          this.snackBar.open('Account created successfully', 'Close', { duration: 3000, verticalPosition: 'top' });
          this.route.navigate(['/login']);
        }
      },
      (error) => {
        console.error('Error:', error);
        this.snackBar.open('Account creation failed: ' + (error?.error?.message || 'Unknown error'), 'Close', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    );
  }
}