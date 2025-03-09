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
    firstName: ['', Validators.required],                   // First Name
    lastName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],  // Email
    password: ['', [Validators.required, Validators.minLength(8)]],  // Password
    rePassword: ['', Validators.required],  // Confirm Password
    role: ['adherent', Validators.required], // Par défaut, c'est "adherent"
  });

  isLinear = false;
  passwordVerif = '';  
  passwordMatch = '';

  // Method to handle user registration
  registerUser() {
    const user = {
      prenom: this.firstFormGroup.value.firstName,
      nom: this.firstFormGroup.value.lastName,
      phone: this.firstFormGroup.value.phoneNumber,
      email: this.secondFormGroup.value.email,
      password: this.secondFormGroup.value.password,
      role: this.secondFormGroup.value.role,
    };

    // Regular expression for password strength
    const passwordStrengthRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const password = this.secondFormGroup.value.password ?? '';
    const rePassword = this.secondFormGroup.value.rePassword ?? '';

    // Password strength check
    if (!passwordStrengthRegex.test(password)) {
      this.passwordVerif = 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
      this.snackBar.open(this.passwordVerif, 'Close', { duration: 3000 });
      return;
    }

    // Password match check
    if (password !== rePassword) {
      this.passwordMatch = 'Please make sure the passwords are matching.';
      this.snackBar.open(this.passwordMatch, 'Close', { duration: 3000 });
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
        this.snackBar.open('Account creation failed: ' + (error?.error?.message || 'Unknown error'), 'Close', { duration: 3000, verticalPosition: 'top' });
      }
    );
  }
}
