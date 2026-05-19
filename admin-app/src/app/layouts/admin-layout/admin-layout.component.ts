import { Component, HostListener } from '@angular/core';

import { Router } from '@angular/router';

import { MENU_ITEMS }
from 'src/app/core/menu.config';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
@HostListener(
  'window:keydown',
  ['$event']
)

export class AdminLayoutComponent {

  menuItems = MENU_ITEMS;
  showCommandPalette = false;

  constructor(
    private router: Router
  ) {}

  logout() {

    localStorage.removeItem(
      'adminToken'
    );

    this.router.navigate([
      '/login'
    ]);

  }
  toggleCommandPalette() {

    this.showCommandPalette =
      !this.showCommandPalette;
  
  }
  
  closeCommandPalette() {
  
    this.showCommandPalette =
      false;
  
  }
  handleKeyboardEvent(
    event: KeyboardEvent
  ) {
  
    if (
  
      (event.ctrlKey ||
        event.metaKey)
  
      &&
  
      event.key === 'k'
  
    ) {
  
      event.preventDefault();
  
      this.toggleCommandPalette();
  
    }
  
  }

}