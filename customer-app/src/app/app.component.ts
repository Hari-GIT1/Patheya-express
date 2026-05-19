import {

  Component,

  OnInit,

  OnDestroy

} from '@angular/core';

import {

  Router,

  NavigationEnd

} from '@angular/router';

import {

  filter,

  Subscription

} from 'rxjs';

import {

  CartService

} from './core/services/cart.service';


@Component({

  selector: 'app-root',

  templateUrl:
    './app.component.html',

  styleUrls: [
    './app.component.scss'
  ]

})

export class AppComponent
implements OnInit, OnDestroy {

  // ==============================
  // CART
  // ==============================
  cartCount = 0;

  total = 0;

  showFloatingCart = true;

  // ==============================
  // SUBSCRIPTIONS
  // ==============================
  private cartSubscription!:
    Subscription;

  private routerSubscription!:
    Subscription;

  constructor(

    private cartService:
      CartService,

    private router:
      Router

  ) {}

  // ==============================
  // INIT
  // ==============================
  ngOnInit(): void {

    // CART STATE
    this.cartSubscription =

      this.cartService.cart$
        .subscribe(items => {

          this.cartCount =

            items.reduce(

              (

                sum,

                item

              ) =>

                sum +
                item.quantity,

              0

            );

          this.total =

            this.cartService
              .getTotal();

        });

    // ROUTE CHANGES
    this.routerSubscription =

      this.router.events
        .pipe(

          filter(

            event =>

              event instanceof
              NavigationEnd

          )

        )

        .subscribe(() => {

          this.handleFloatingCart();

        });

    // INITIAL CHECK
    this.handleFloatingCart();

  }

  // ==============================
  // DESTROY
  // ==============================
  ngOnDestroy(): void {

    if (

      this.cartSubscription

    ) {

      this.cartSubscription
        .unsubscribe();

    }

    if (

      this.routerSubscription

    ) {

      this.routerSubscription
        .unsubscribe();

    }

  }

  // ==============================
  // HANDLE FLOATING CART
  // ==============================
  handleFloatingCart(): void {

    const hiddenRoutes = [

      '/auth/login',
    
      '/auth/register',
    
      '/cart',
    
      '/checkout',
    
      '/track-order'
    
    ];

    const currentUrl =
      this.router.url;

    this.showFloatingCart =

      !hiddenRoutes.some(

        route =>

          currentUrl.includes(
            route
          )

      );

  }

  // ==============================
  // GO TO CART
  // ==============================
  goToCart(): void {

    this.router.navigate([
      '/cart'
    ]);

  }

}