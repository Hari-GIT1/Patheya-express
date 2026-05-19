import {

  Component,

  OnInit

} from '@angular/core';

import {

  Router

} from '@angular/router';

import {

  AuthService

} from 'src/app/core/services/auth.service';

import {

  CartService

} from 'src/app/core/services/cart.service';

@Component({

  selector: 'app-navbar',

  templateUrl: './navbar.component.html',

  styleUrls: ['./navbar.component.scss']

})

export class NavbarComponent
implements OnInit {

  user: any = null;

  cartCount = 0;

  constructor(

    private authService:
      AuthService,

    private cartService:
      CartService,

    private router:
      Router

  ) {}

  ngOnInit(): void {

    // USER
    this.authService.user$
      .subscribe(user => {

        this.user = user;

      });

    // CART COUNT
    this.cartService.cart$
      .subscribe(items => {

        this.cartCount =
          items.reduce(

            (sum, item) =>

              sum + item.quantity,

            0

          );

      });

  }

  // ==============================
  // LOGOUT
  // ==============================
  logout(): void {

    this.authService.logout();

    this.router.navigate([
      '/auth/login'
    ]);

  }

  // ==============================
  // ROLE CHECKS
  // ==============================
  isCustomer(): boolean {

    return this.user?.role ===
      'customer';

  }

  isOwner(): boolean {

    return (
      this.user?.role ===
      'restaurant_owner'
    );
  
  }

  isLoggedIn(): boolean {

    return !!this.user;

  }

  // ==============================
  // AVATAR INITIAL
  // ==============================
  getInitial(): string {

    return (
  
      this.user?.name
        ?.charAt(0)
  
      ||
  
      this.user?.email
        ?.charAt(0)
  
      ||
  
      'U'
  
    ).toUpperCase();
  
  }
  get userName(): string {

    return (
  
      this.user?.name ||
  
      this.user?.email ||
  
      'User'
  
    );
  
  }

}