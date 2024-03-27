import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { slideFade } from 'src/app/animations/animations';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [slideFade]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  formSubmitted = false;
  backendErrorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private errorService: ErrorService) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      role: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.errorService.error$.subscribe((error) => {
      this.backendErrorMessage = error.message;
    });
  }

  register(): void {
    this.formSubmitted = true;
    if (this.registerForm.valid && this.registerForm.value.password === this.registerForm.value.repeatPassword) {
      const { email, username, role, password, repeatPassword } = this.registerForm.value;
      this.userService.register(email, username, role, password, repeatPassword).subscribe({
        next: (user) => {
          console.log("Registration successful", user);
          this.router.navigate(['/']);
        },
        error: (error) => {
          let errorMessage = "Registration failed due to an unknown error.";
          if (error instanceof HttpErrorResponse) {
            errorMessage = error.error.message || "An error occurred during registration.";
          }
          this.errorService.handleError({errorCode: error.status, message: errorMessage, details: ''});
          console.error(errorMessage);
        }
      });
    } else {
      let formErrorMessage = "Form is not valid or passwords do not match.";
      this.errorService.handleError({errorCode: -1, message: formErrorMessage, details: 'Please check your input and try again.'});
      console.error(formErrorMessage);
    }
  }
}