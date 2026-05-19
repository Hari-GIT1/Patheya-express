import {

  Component,

  OnInit

} from '@angular/core';

import {

  Router

} from '@angular/router';

import {

  AuthService

} from '../../../core/services/auth.service';

@Component({

  selector: 'app-login',

  templateUrl: './login.component.html',

  styleUrls: ['./login.component.scss']

})

export class LoginComponent
implements OnInit {

  email = '';

  password = '';

  loading = false;

  error = '';

  constructor(

    private authService:
      AuthService,

    private router:
      Router

  ) {}

  ngOnInit(): void {

    const user =
      this.authService
        .getUser();

    if (user) {

      this.authService
        .redirectUser(
          this.router
        );

    }

  }

  // ==============================
  // LOGIN
  // ==============================
  onSubmit(): void {

    this.error = '';

    if (

      !this.email ||

      !this.password

    ) {

      this.error =
        'Please fill all fields';

      return;

    }

    this.loading = true;

    const payload = {

      email: this.email,

      password: this.password

    };

    this.authService
      .login(payload)
      .subscribe({

        next: (res: any) => {

          this.authService
            .setUser(

              res.data.user,

              res.data.token

            );

          this.authService
            .redirectUser(
              this.router
            );

          this.loading = false;

        },

        error: (err: any) => {

          console.error(err);

          this.error =

            err.error?.message ||

            'Login failed';

          this.loading = false;

        }

      });

  }

}