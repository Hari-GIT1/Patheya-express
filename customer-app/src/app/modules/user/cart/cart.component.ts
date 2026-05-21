import {

  Component,

  OnInit,

  OnDestroy

} from '@angular/core';

import {

  Router

} from '@angular/router';

import {

  Subscription

} from 'rxjs';

import {

  CartService

} from '../../../core/services/cart.service';

@Component({

  selector: 'app-cart',

  templateUrl: './cart.component.html',

  styleUrls: ['./cart.component.scss']

})

export class CartComponent
implements OnInit, OnDestroy {

  // ==============================
  // CART STATE
  // ==============================
  cartItems: any[] = [];

  total = 0;

  deliveryFee = 40;

  taxes = 25;

  grandTotal = 0;

  private cartSubscription!:
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

    this.cartSubscription =

      this.cartService.cart$
        .subscribe(items => {

          this.cartItems = items;

          this.calculateTotals();

        });

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

  }

  // ==============================
  // CALCULATE TOTALS
  // ==============================
  calculateTotals(): void {

    this.total =
      this.cartService
        .getTotal();

    this.grandTotal =

      this.total +

      this.deliveryFee +

      this.taxes;

  }

  // ==============================
  // INCREASE QTY
  // ==============================
  increase(item: any): void {

    this.cartService
      .increaseQty(item);

  }

  // ==============================
  // DECREASE QTY
  // ==============================
  decrease(item: any): void {

    this.cartService
      .decreaseQty(item);

  }

  // ==============================
  // REMOVE ITEM
  // ==============================
  removeItem(itemId: string): void {

    this.cartService
      .removeItem(itemId);

  }

  // ==============================
  // CLEAR CART
  // ==============================
  clearCart(): void {

    this.cartService
      .clearCart();

  }

  // ==============================
  // GO TO CHECKOUT
  // ==============================
  goToCheckout(): void {

    if (

      this.cartItems.length === 0

    ) return;

    this.router.navigate([
      '/checkout'
    ]);

  }

  // ==============================
  // TRACK BY
  // ==============================
  trackByItem(
    index: number,
    item: any
  ): string {

    return item._id;

  }

}