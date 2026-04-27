import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  loading = false;

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.registerForm.invalid) return;

    const formValue = this.registerForm.value;

    const payload = {
      name: formValue.name || '',
      email: formValue.email || '',
      phone: formValue.phone || '',
      password: formValue.password || ''
    };
    
    this.authService.register(payload).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      }
    });
  }
}