import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  total = 0;

  constructor(private cartService: CartService, private router:Router) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  increase(item: any) {
    this.cartService.increaseQty(item);
  }

  decrease(item: any) {
    this.cartService.decreaseQty(item);
  }


goToCheckout() {
  this.router.navigate(['/checkout']);
}
}