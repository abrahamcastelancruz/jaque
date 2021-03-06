import { User } from './../../shared/models/User.model';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth-service.service';
import { ConfirmedValidator } from 'src/app/shared/validators/ConfrmValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.styl'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  togglePassword = true;
  toggleConfirmPassword = true;
  user: User;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registerForm = this.fb.group(
      {
        username: new FormControl('', Validators.required),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
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
      { validator: ConfirmedValidator('password', 'confirmPassword') }
    );
  }

  register() {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      this.user = {
        userName: username,
        email: email,
        password: password,
      };
      this.auth.register(this.user);
    }
  }

  hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  };
}
