import {

  Component

} from '@angular/core';

import {

  FormBuilder,

  Validators

} from '@angular/forms';

import {

  Router

} from '@angular/router';

import {

  AuthService

} from '../../core/services/auth.service';

@Component({

  selector: 'app-register',

  templateUrl: './register.component.html',

  styleUrls: ['./register.component.scss']

})

export class RegisterComponent {

  loading = false;

  constructor(

    private fb:
      FormBuilder,

    private authService:
      AuthService,

    private router:
      Router

  ) {}

  registerForm =
    this.fb.group({

      name: [

        '',

        Validators.required

      ],

      restaurantName: [

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

      phone: [

        '',

        Validators.required

      ],

      password: [

        '',

        [

          Validators.required,

          Validators.minLength(6)

        ]

      ]

    });

  // ==============================
  // REGISTER
  // ==============================
  onRegister(): void {

    if (

      this.registerForm.invalid

    ) return;

    this.loading = true;

    this.authService
      .register(
        this.registerForm.value
      )
      .subscribe({

        next: (res: any) => {

          console.log(
            'REGISTER SUCCESS:',
            res
          );

          // AUTO LOGIN
          if (res.data?.token) {

            this.authService
              .saveToken(

                res.data.token

              );

            this.authService
              .saveUser(

                res.data.user

              );

            this.router.navigate([
              '/dashboard'
            ]);

          } else {

            this.router.navigate([
              '/login'
            ]);

          }

          this.loading = false;

        },

        error: (err) => {

          console.log(err);

          this.loading = false;

        }

      });

  }

}