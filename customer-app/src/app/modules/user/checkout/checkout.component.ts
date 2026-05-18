import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { OrderService } from '../../../core/services/order.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cartItems: any[] = [];
  orderType = 'delivery';
  address: string = '';

  private paymentBaseUrl = `${environment.api.baseUrl}/payment`;
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
  }

  get total() {
    return this.cartService.getTotal();
  }

  placeOrder() {

    const user =
      JSON.parse(
        localStorage.getItem('user') || '{}'
      );
  
    if (!user.id) {
  
      alert('Login required');
  
      return;
  
    }
  
    if (this.cartItems.length === 0) {
  
      alert('Cart empty');
  
      return;
  
    }
  
    const order = {
  
      restaurantId:
        this.cartItems[0]?.restaurantId,
  
      items: this.cartItems,
  
      total: this.total,
  
      status: 'placed'
  
    };
  
    console.log('ORDER:', order);
  
    this.orderService
      .placeOrder(order)
  
      .subscribe({
  
        next: (res: any) => {
  
          console.log(
            'ORDER CREATED:',
            res
          );
  
          this.cartService.clearCart();
  
          // REDIRECT
          this.router.navigate([
            '/track-order',
            res._id
          ]);
  
        },
  
        error: (err: any) => {
  
          console.error(err);
  
          alert(
  
            err.error?.message ||
  
            'Order failed'
  
          );
  
        }
  
      });
  
  }

  payNow() {

    this.http.post(
      `${this.paymentBaseUrl}/create-order`,
      { amount: 500 }
    ).subscribe((order: any) => {

      const options = {
        key: 'rzp_test_Sop8avBtckAdw2',

        amount: order.amount,
        currency: order.currency,
        name: 'Patheya Express',
        description: 'Food Order',

        order_id: order.id,

        handler: (response: any) => {

          console.log('PAYMENT SUCCESS', response);

          this.http.post(
            `${this.paymentBaseUrl}/verify-payment`,
            response
          ).subscribe((verify: any) => {

            console.log('VERIFY RESPONSE', verify);

            if (verify.success) {
              alert('Payment Successful');
            }

          });

        },
        
        prefill: {
          name: 'Hari',
          email: 'test@test.com'
        },

        theme: {
          color: '#3399cc'
        }
      };

      const rzp = new (window as any).Razorpay(options);

      rzp.open();

    });

  }
}