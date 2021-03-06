import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmedValidator } from 'src/app/shared/validators/ConfrmValidator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.styl'],
})
export class RegisterComponent implements OnInit {
  // General properties
  registerForm: FormGroup;
  togglePassword = true;
  toggleConfirmPassword = true;
  user: UserModel;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.user = new UserModel();
  }

  // Initializing register form
  initializeForm(): void {
    this.registerForm = this.fb.group(
      {
        username: new FormControl('', Validators.required),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'), // Validating email by Regex
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      { validator: ConfirmedValidator('password', 'confirmPassword') } // Custom validator for PasswordMatch
    );
  }

  register() {
    if (this.registerForm.valid) {
      Swal.fire({
        icon: 'info',
        title: 'Creando Cuenta....',
        text: 'Espera un momento por favor',
        allowOutsideClick: false,
      });
      Swal.showLoading();
      const { username, email, password } = this.registerForm.value; // Destructuring register form
      this.user = {
        email: email,
        password: password,
        name: username,
      };
      this.auth.newUser(this.user).subscribe(
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

  // Function to validate error in login form
  hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  };
}
