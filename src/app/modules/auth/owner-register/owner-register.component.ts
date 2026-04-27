import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-owner-register',
  templateUrl: './owner-register.component.html'
})
export class OwnerRegisterComponent {

  name = '';
  email = '';
  password = '';
  restaurantName = '';
  cuisines = '';

  constructor(private api: ApiService, private router: Router, private auth:AuthService) {}

  register() {
    this.api.post<any>('auth/owner-register', {
      name: this.name,
      email: this.email,
      password: this.password,
      restaurantName: this.restaurantName,
      cuisines: this.cuisines.split(',')
    }).subscribe(res => {

      // ✅ Auto login
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      this.auth.redirectUser(this.router);

      this.router.navigate(['/restaurant']);
    });
  }
}