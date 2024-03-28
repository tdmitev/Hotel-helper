import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { slideFade } from 'src/app/animations/animations';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [slideFade]
})
export class LoginComponent {
  loginForm: FormGroup;
  formSubmitted = false;
  loginError: string = '';

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder, private messageService: MessageService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.userService.login(email, password).subscribe({
        next: (response) => {
          this.messageService.setMessage(`Welcome, ${response.role + " " + response.username}!`);
          console.log(localStorage.getItem('authToken'));
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.loginError = 'Invalid email or password'; 
          console.error("Login failed:", error);
        }
      });
    } else {
      console.error("Form is not valid.");
    }
  }
}