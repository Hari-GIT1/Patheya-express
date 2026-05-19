import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-owner-login',
  templateUrl: './owner-login.component.html'
})
export class OwnerLoginComponent {

  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login({ email: this.email, password: this.password })
    .subscribe({
      next: (res: any) => {
        this.auth.setUser(res.user, res.token);
        this.auth.redirectUser(this.router);
      }
    });
  }
}