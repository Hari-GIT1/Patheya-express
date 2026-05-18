import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent {
  
  loading = false;
  error = '';
  email: string = '';
password: string = '';

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    const user = localStorage.getItem('user');
  
    if (user) {
      this.authService.redirectUser(this.router);
    }
  }

  onSubmit() {
    const data = {
      email: this.email,
      password: this.password
    };
  
    this.authService.login(data).subscribe({
      next: (res: any) => {
    
        this.authService.setUser(res.user, res.token);
    
        this.authService.redirectUser(this.router);
      },
      error: (err: any) => {
        console.error('LOGIN ERROR:', err);
      }
    });
  }
}