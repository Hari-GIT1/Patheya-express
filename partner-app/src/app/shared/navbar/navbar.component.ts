import { Component, EventEmitter, Output } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Output() toggleSidebar = new EventEmitter();

  restaurantName = '';

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const user = this.authService.getUser();

    console.log(user);

    this.restaurantName =
      user?.restaurantName || 'Restaurant';

  }

  onToggleSidebar(): void {

    this.toggleSidebar.emit();

  }

  logout(): void {

    sessionStorage.clear();

    this.router.navigate(['/login']);

  }

}