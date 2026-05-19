import {

  Injectable

} from '@angular/core';

import {

  Observable

} from 'rxjs';

import {

  ApiService

} from './api.service';

@Injectable({

  providedIn: 'root'

})

export class OrderService {

  constructor(

    private api:
      ApiService

  ) {}

  // ==============================
  // PLACE ORDER
  // ==============================
  placeOrder(

    order: any

  ): Observable<any> {

    return this.api.post(

      'orders',

      order

    );

  }

  // ==============================
  // GET SINGLE ORDER
  // ==============================
  getOrder(

    id: string

  ): Observable<any> {

    return this.api.get(

      `orders/${id}`

    );

  }

  // ==============================
  // GET RESTAURANT ORDERS
  // ==============================
  getRestaurantOrders(

    restaurantId: string

  ): Observable<any> {

    return this.api.get(

      `orders/restaurant/${restaurantId}`

    );

  }

  // ==============================
  // UPDATE STATUS
  // ==============================
  updateOrderStatus(

    orderId: string,

    status: string

  ): Observable<any> {

    return this.api.patch(

      `orders/${orderId}/status`,

      { status }

    );

  }

  // ==============================
  // GET USER ORDERS
  // ==============================
  getUserOrders(

    userId: string

  ): Observable<any> {

    return this.api.get(

      `orders/user/${userId}`

    );

  }

}