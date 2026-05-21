import {

  Component,

  HostListener,

  OnInit

} from '@angular/core';

import { Router } from '@angular/router';

import { MENU_ITEMS }
from 'src/app/core/menu.config';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})

export class AdminLayoutComponent
implements OnInit {

  admin = JSON.parse(
    localStorage.getItem(
      'adminData'
    ) || '{}'
  );

  menuItems = MENU_ITEMS.filter(
    item =>
      item.roles  .includes(
        this.admin.role
      )
  );

  showCommandPalette = false;

  pendingRestaurantCount = 0;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

    // Future:
    // load pending restaurant count
    // initialize sockets
    // load notifications

  }

  logout(): void {

    localStorage.removeItem(
      'adminToken'
    );

    localStorage.removeItem(
      'adminData'
    );

    this.router.navigate([
      '/login'
    ]);

  }

  toggleCommandPalette(): void {

    this.showCommandPalette =
      !this.showCommandPalette;

  }

  closeCommandPalette(): void {

    this.showCommandPalette =
      false;

  }

  // KEYBOARD SHORTCUT

  @HostListener(
    'window:keydown',
    ['$event']
  )

  handleKeyboardEvent(
    event: KeyboardEvent
  ): void {

    if (

      (
        event.ctrlKey ||
        event.metaKey
      )

      &&

      event.key.toLowerCase()
      === 'k'

    ) {

      event.preventDefault();

      this.toggleCommandPalette();

    }

  }

}