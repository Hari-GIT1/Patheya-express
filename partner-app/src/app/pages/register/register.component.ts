import { Component } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  registerForm = this.fb.group({

    restaurantName: ['', Validators.required],

    email: ['', [Validators.required, Validators.email]],

    phone: ['', Validators.required],

    password: ['', Validators.required]

  });

  onRegister(): void {

    if (this.registerForm.invalid) return;

    this.loading = true;

    this.authService
      .register(this.registerForm.value)
      .subscribe({

        next: () => {

          this.router.navigate(['/login']);

          this.loading = false;

        },

        error: (err) => {

          console.log(err);

          this.loading = false;

        }

      });

  }

}
