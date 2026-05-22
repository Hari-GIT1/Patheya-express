import { Component } from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  HttpClient
} from '@angular/common/http';

import {
  environment
} from 'src/environments/environment';

@Component({

  selector: 'app-register',

  templateUrl:
    './register.component.html',

  styleUrls: [
    './register.component.scss'
  ]

})

export class RegisterComponent {

  apiUrl =
    environment.apiUrl;

  formData = {

    name: '',

    phone: '',

    email: '',

    password: '',

    vehicleType: 'bike',

    vehicleNumber: ''

  };

  loading = false;

  error = '';

  success = '';

  constructor(

    private http: HttpClient,

    private router: Router

  ) {}

  // ==============================
  // REGISTER
  // ==============================

  register(): void {

    this.loading = true;

    this.error = '';

    this.http.post(

      `${this.apiUrl}/delivery/register`,

      this.formData

    )

    .subscribe({

      next: () => {

        this.success =
          'Registration successful';

        this.loading = false;

        setTimeout(() => {

          this.router.navigate([
            '/login'
          ]);

        }, 1500);

      },

      error: (err) => {

        this.error =

          err.error.message ||

          'Registration failed';

        this.loading = false;

      }

    });

  }

}