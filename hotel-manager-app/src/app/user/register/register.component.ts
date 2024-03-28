import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { slideFade } from 'src/app/animations/animations';
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

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      role: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

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
        error: (errorMessage) => {
          console.error("Registration failed:", errorMessage);
        }
      });
    } else {
      console.error("Form is not valid or passwords do not match.");
    }
  }
}