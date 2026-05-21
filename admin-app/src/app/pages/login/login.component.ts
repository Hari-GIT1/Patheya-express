import { Component } from '@angular/core';

import {
  FormBuilder,
  Validators
} from '@angular/forms';

import { Router }
from '@angular/router';

import { AdminAuthService }
from 'src/app/core/services/admin-auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loading = false;

  errorMessage = '';

  loginForm = this.fb.group({

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ]

  });

  constructor(

    private fb: FormBuilder,

    private authService:
      AdminAuthService,

    private router: Router

  ) {}

  onSubmit(): void {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    this.authService
      .login(this.loginForm.value)
      .subscribe({

        next: () => {

          this.router.navigate([
            '/dashboard'
          ]);

        },

        error: (err: any) => {

          this.errorMessage =
            err?.error?.message ||
            'Login failed';

          this.loading = false;

        },

        complete: () => {

          this.loading = false;

        }

      });

  }

}