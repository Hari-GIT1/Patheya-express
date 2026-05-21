import { Component } from '@angular/core';

import {
  FormBuilder,
  Validators
} from '@angular/forms';

import { HttpClient }
from '@angular/common/http';

import { Router }
from '@angular/router';

import { environment }
from 'src/environments/environment';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss']
})
export class AdminRegisterComponent {

  loading = false;

  errorMessage = '';

  roles = [

    'operations_admin',

    'support_admin',

    'finance_admin',

    'marketing_admin'

  ];

  registerForm = this.fb.group({

    name: [
      '',
      Validators.required
    ],

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
    ],

    role: [
      'operations_admin',
      Validators.required
    ]

  });

  constructor(

    private fb: FormBuilder,

    private http: HttpClient,

    private router: Router

  ) {}

  onSubmit(): void {

    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    this.http.post(

      `${environment.apiBaseUrl}/admin/auth/register`,

      this.registerForm.value

    ).subscribe({

      next: () => {

        this.router.navigate([
          '/login'
        ]);

      },

      error: (err: any) => {

        this.errorMessage =
          err?.error?.message ||
          'Registration failed';

        this.loading = false;

      },

      complete: () => {

        this.loading = false;

      }

    });

  }

}