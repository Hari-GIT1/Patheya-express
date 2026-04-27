import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cartItems: any[] = [];
  orderType = 'delivery';
  address: string = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
  }

  get total() {
    return this.cartService.getTotal();
  }

  placeOrder() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user._id) {
      alert('Login required');
      return;
    }

    if (this.cartItems.length === 0) {
      alert('Cart empty');
      return;
    }

    const order = {
      userId: user._id,
      restaurantId: this.cartItems[0]?.restaurantId,
      items: this.cartItems,
      total: this.total,
      status: 'placed'
    };

    console.log('ORDER:', order);

    this.orderService.placeOrder(order).subscribe({
      next: (res: any) => {
        console.log('ORDER CREATED:', res);

        this.cartService.clearCart();

        // 🔥 THIS FIXES YOUR REDIRECT ISSUE
        this.router.navigate(['/track-order', res._id]);
      },
      error: (err: any) => {
        console.error(err);
        alert(err.error?.message || 'Order failed');
      }
    });
  }
}