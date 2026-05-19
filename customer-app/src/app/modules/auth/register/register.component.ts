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

} from '../../../core/services/auth.service';

@Component({

  selector: 'app-register',

  templateUrl:
    './register.component.html',

  styleUrls: [
    './register.component.scss'
  ]

})

export class RegisterComponent {

  loading = false;

  error = '';

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
  // SUBMIT
  // ==============================
  onSubmit(): void {

    if (

      this.registerForm.invalid

    ) return;

    this.loading = true;

    const payload = {

      name:
        this.registerForm.value
          .name || '',

      email:
        this.registerForm.value
          .email || '',

      phone:
        this.registerForm.value
          .phone || '',

      password:
        this.registerForm.value
          .password || ''

    };

    this.authService
      .register(payload)
      .subscribe({

        next: () => {

          this.loading = false;

          this.router.navigate([
            '/auth/login'
          ]);

        },

        error: (err) => {

          console.log(err);

          this.error =

            err.error?.message ||

            'Registration failed';

          this.loading = false;

        }

      });

  }

}