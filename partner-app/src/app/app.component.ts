import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  sidebarOpen = true;

  showSidebar(): boolean {

    const hiddenRoutes = [
      '/login',
      '/register',
      '/'
    ];

    return (
      this.authService.isAuthenticated() &&
      !hiddenRoutes.includes(this.router.url)
    );

  }
  toggleSidebar(): void {

    this.sidebarOpen = !this.sidebarOpen;
  
  }

}
