import { Component }
from '@angular/core';

import { Router }
from '@angular/router';

import { AdminAuthService }
from 'src/app/core/services/admin-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = '';

  password = '';

  loading = false;

  constructor(

    private authService:
      AdminAuthService,

    private router: Router

  ) {}

  login() {

    this.loading = true;

    this.authService.login({

      email: this.email,

      password: this.password

    }).subscribe({

      next: (res: any) => {
        console.log(res);

        localStorage.setItem(

          'adminToken',

          res.data.token

        );

        localStorage.setItem(
          'adminToken',
          res.data.token
        );
        
        this.router.navigate([
          '/dashboard'
        ]);

      },

      error: (err) => {

        alert(
          err.error.message
        );

        this.loading = false;

      }

    });

  }

}