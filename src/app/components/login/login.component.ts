import { UserModel } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { faFacebookSquare, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl'],
})
export class LoginComponent implements OnInit {
  // Font Awesome Icons Properties
  faFacebook = faFacebookSquare;
  faGoogle = faGoogle;

  // General properties
  loginForm: FormGroup;
  togglePassword = true;
  user: UserModel;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.user = new UserModel();
  }

  // Initializing login form
  initializeForm(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'), // Defining Regex to validate email Form Control
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  // Function to validate error in login form
  hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  // login method
  login() {
    if (this.loginForm.valid) {
      Swal.fire({
        icon: 'info',
        title: 'Inciando Sesión....',
        text: 'Espera un momento por favor',
        allowOutsideClick: false,
      });
      Swal.showLoading();
      const { email, password } = this.loginForm.value; // Destructuring login forms
      this.user = {
        email: email,
        password: password,
      };
      this.auth.loginEmailPassword(this.user).subscribe(
        (res) => {
          Swal.close();
          this.router.navigateByUrl('/dashboard');
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Opss..',
            text: error.error.error.message,
          });
        }
      );
    }
  }
}
