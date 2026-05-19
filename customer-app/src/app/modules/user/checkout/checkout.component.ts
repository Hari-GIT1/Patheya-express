import {

  Component,

  OnInit

} from '@angular/core';

import {

  Router

} from '@angular/router';

import {

  HttpClient

} from '@angular/common/http';

import {

  CartService

} from '../../../core/services/cart.service';

import {

  OrderService

} from '../../../core/services/order.service';

import {

  environment

} from 'src/environments/environment';

@Component({

  selector: 'app-checkout',

  templateUrl:
    './checkout.component.html',

  styleUrls: [
    './checkout.component.scss'
  ]

})

export class CheckoutComponent
implements OnInit {

  cartItems: any[] = [];

  loading = false;

  orderType = 'delivery';

  address = '';

  deliveryFee = 40;

  taxes = 25;

  grandTotal = 0;

  private paymentBaseUrl =

    `${environment.api.baseUrl}/payment`;

  constructor(

    private cartService:
      CartService,

    private orderService:
      OrderService,

    private router:
      Router,

    private http:
      HttpClient

  ) {}

  // ==============================
  // INIT
  // ==============================
  ngOnInit(): void {

    this.cartItems =
      this.cartService
        .getCart();

    this.calculateTotal();

  }

  // ==============================
  // TOTAL
  // ==============================
  get total(): number {

    return this.cartService
      .getTotal();

  }

  calculateTotal(): void {

    this.grandTotal =

      this.total +

      this.deliveryFee +

      this.taxes;

  }

  // ==============================
  // PAYMENT
  // ==============================
  payNow(): void {

    const token = localStorage.getItem(
      'token'
    );
  
    const user = JSON.parse(
  
      localStorage.getItem(
        'user'
      ) || '{}'
  
    );
  
    // 🔐 LOGIN CHECK
    if (!token) {
  
      this.router.navigate(
  
        ['/auth/login'],
  
        {
  
          queryParams: {
  
            redirect: '/checkout'
  
          }
  
        }
  
      );
  
      return;
  
    }
  
    // 📍 ADDRESS CHECK
    if (
  
      this.orderType ===
      'delivery'
  
      &&
  
      !this.address.trim()
  
    ) {
  
      alert(
        'Please enter address'
      );
  
      return;
  
    }
  
    this.loading = true;
  
    // ==============================
    // CREATE RAZORPAY ORDER
    // ==============================
    this.http.post(
  
      `${this.paymentBaseUrl}/create-order`,
  
      {
  
        amount:
          this.grandTotal
  
      }
  
    ).subscribe({
  
      next: (order: any) => {

        const razorpayOrder =
      
          order.data || order;
      
        const options = {
      
          key:
            environment
              .razorpayKey,
      
          amount:
            razorpayOrder.amount,
      
          currency:
            razorpayOrder.currency,
      
          name:
            'Patheya Express',
      
          description:
            'Food Order Payment',
      
          order_id:
            razorpayOrder.id,
      
          handler:
            (response: any) => {
      
              this.verifyPayment(
                response
              );
      
            },
      
          prefill: {
      
            name:
              user.name || '',
      
            email:
              user.email || ''
      
          },
      
          theme: {
      
            color:
              '#f43f5e'
      
          }
      
        };
      
        const razorpay =
      
          new (window as any)
            .Razorpay(options);
      
        razorpay.open();
      
        this.loading = false;
      
      },
  
      error: (err: any) => {
  
        console.log(err);
  
        this.loading = false;
  
        alert(
          'Payment initialization failed'
        );
  
      }
  
    });
  
  }

  // ==============================
  // VERIFY PAYMENT
  // ==============================
  verifyPayment(
    paymentData: any
  ): void {

    this.http.post(

      `${this.paymentBaseUrl}/verify-payment`,

      paymentData

    ).subscribe({

      next: (verify: any) => {

        if (

          verify.success

        ) {

          this.placeOrder();

        }

      },

      error: (err) => {

        console.log(err);

        alert(
          'Payment verification failed'
        );

      }

    });

  }

  // ==============================
  // PLACE ORDER
  // ==============================
  placeOrder(): void {

    const order = {

      restaurantId:

        this.cartItems[0]
          ?.restaurantId,

      items:
        this.cartItems,

      total:
        this.grandTotal,

      orderType:
        this.orderType,

      address:
        this.address,

      paymentMethod:
        'razorpay',

      status:
        'Placed'

    };

    this.orderService
      .placeOrder(order)
      .subscribe({

        next: (res: any) => {

          this.cartService
            .clearCart();

          this.router.navigate([

            '/track-order',

            res.data._id

          ]);

        },

        error: (err) => {

          console.log(err);

          alert(
            'Order failed'
          );

        }

      });

  }

  // ==============================
  // TRACKBY
  // ==============================
  trackByItem(
    index: number,
    item: any
  ): string {

    return item._id;

  }

}