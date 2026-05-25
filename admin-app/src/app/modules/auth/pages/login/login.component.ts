import { Component }
from '@angular/core';

import { Router }
from '@angular/router';

import { AuthService }
from '../../../../core/services/auth.service';

@Component({

  selector: 'app-login',

  templateUrl:
    './login.component.html',

  styleUrls:
    ['./login.component.scss']

})
export class LoginComponent {

  email = '';

  password = '';

  loading = false;

  errorMessage = '';

  constructor(

    private authService:
      AuthService,

    private router: Router

  ) {}

  onLogin(): void {

    this.loading = true;

    this.errorMessage = '';

    this.authService.login({

      email: this.email,

      password: this.password

    }).subscribe({

      next: () => {

        this.loading = false;

        this.router.navigate([
          '/dashboard'
        ]);

      },

      error: (error) => {

        this.loading = false;

        this.errorMessage =

          error?.error?.message ||

          'Invalid credentials';

      }

    });

  }

}