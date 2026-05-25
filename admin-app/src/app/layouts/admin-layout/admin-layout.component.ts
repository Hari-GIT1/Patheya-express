import { Component }
from '@angular/core';

import { Router }
from '@angular/router';

import { AuthService }
from '../../core/services/auth.service';

@Component({

  selector: 'app-admin-layout',

  templateUrl:
    './admin-layout.component.html',

  styleUrls:
    ['./admin-layout.component.scss']

})
export class AdminLayoutComponent {

  sidebarCollapsed = false;

  constructor(

    private authService:
      AuthService,

    private router: Router

  ) {}

  toggleSidebar(): void {

    this.sidebarCollapsed =
      !this.sidebarCollapsed;

  }

  logout(): void {

    this.authService.logout();

  }

}