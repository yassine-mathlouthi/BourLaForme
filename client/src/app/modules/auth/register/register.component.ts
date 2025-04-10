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

  ngOnInit(): void {
    // Dynamically update validators based on role selection
    this.firstFormGroup.controls['role'].valueChanges.subscribe((role) => {
      if (role === 'coach') {
        this.secondFormGroup.controls['speciality'].setValidators([Validators.required]);
        this.secondFormGroup.controls['bio'].setValidators([Validators.required]);
        this.showCoachFields = true; // Show coach fields
      } else {
        this.secondFormGroup.controls['speciality'].clearValidators();
        this.secondFormGroup.controls['bio'].clearValidators();
        this.showCoachFields = false; // Hide coach fields
      }

      // Update validity of the fields
      this.secondFormGroup.controls['speciality'].updateValueAndValidity();
      this.secondFormGroup.controls['bio'].updateValueAndValidity();
    });
}

// Add a property to control visibility
showCoachFields = false;


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
    if (input.files) {
      this.selectedImage = input.files[0];
    }
  }

  // Method to handle user registration
  registerUser() {
    const user = {
      prenom: this.firstFormGroup.value.firstName || '',
      nom: this.firstFormGroup.value.lastName || '',
      phone: this.firstFormGroup.value.phoneNumber || '',
      role: this.firstFormGroup.value.role || 'adherent',
      bio: this.secondFormGroup.value.bio || '',
      specialty: this.secondFormGroup.value.speciality || '', // Note: changed to 'specialty' to match backend
      email: this.thirdFormGroup.value.email || '',
      password: this.thirdFormGroup.value.password || '',
    };
  
    console.log('Données envoyées:', user);
  
    // Password validation
    const passwordStrengthRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const password = this.thirdFormGroup.value.password ?? '';
    const rePassword = this.thirdFormGroup.value.rePassword ?? '';
  
    if (!passwordStrengthRegex.test(password)) {
      this.snackBar.open(
        'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        'Close',
        { duration: 3000 }
      );
      return;
    }
  
    if (password !== rePassword) {
      this.passwordMatch = 'Passwords do not match.';
      this.snackBar.open(this.passwordMatch, 'Close', { duration: 3000 });
      return;
    }
  
    // Create FormData
    const formData = new FormData();
    formData.append('prenom', this.firstFormGroup.value.firstName || '');
    formData.append('nom', this.firstFormGroup.value.lastName || '');
    formData.append('phone', this.firstFormGroup.value.phoneNumber || '');
    formData.append('role', this.firstFormGroup.value.role || 'adherent');
    formData.append('email', this.thirdFormGroup.value.email || '');
    formData.append('password', this.thirdFormGroup.value.password || '');

    // Ajout des champs spécifiques au coach
    if (this.firstFormGroup.value.role === 'coach') {
        formData.append('specialty', this.secondFormGroup.value.speciality || '');
        formData.append('bio', this.secondFormGroup.value.bio || '');
        if (this.selectedImage) {
            formData.append('image', this.selectedImage);
        }
    }
  
    // Debug: Log FormData contents
    formData.forEach((value, key) => {
      console.log(key, value);
    });
  
    this.authService.register(formData).subscribe(
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
  }}