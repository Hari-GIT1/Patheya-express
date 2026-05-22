import { Component } from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  AuthService
} from 'src/app/core/services/auth.service';

@Component({

  selector: 'app-login',

  templateUrl: './login.component.html',

  styleUrls: ['./login.component.scss']

})

export class LoginComponent {

  phone = '';

  password = '';

  loading = false;

  error = '';

  constructor(

    private authService:
      AuthService,

    private router:
      Router

  ) {}

  login(): void {

    this.loading = true;

    this.error = '';

    this.authService.login({

      phone:
        this.phone,

      password:
        this.password

    })

    .subscribe({

      next: (res: any) => {

        this.authService.saveToken(

          res.data.token

        );

        this.authService.saveUser(

          res.data.deliveryPartner

        );

        this.router.navigate([
          '/dashboard'
        ]);

      },

      error: (err) => {

        this.error =
          err.error.message ||
          'Login failed';

        this.loading = false;

      }

    });

  }

}