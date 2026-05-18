import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = this.fb.group({

    email: ['', [Validators.required, Validators.email]],

    password: ['', Validators.required]

  });

  onLogin(): void {

    if (this.loginForm.invalid) return;

    this.loading = true;

    this.authService
      .login(this.loginForm.value)
      .subscribe({

        next: (res) => {

          this.authService.saveToken(res.token);
          this.authService.saveUser(res.user);
          this.router.navigate(['/dashboard']);

          this.loading = false;
        },

        error: (err) => {

          console.log(err);

          this.loading = false;

        }

      });

  }
  

}
