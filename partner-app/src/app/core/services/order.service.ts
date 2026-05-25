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
    private api: ApiService
  ) {}

  // ==============================
  // GET PARTNER ORDERS
  // ==============================
  getOrders(
    queryParams?: any
  ): Observable<any> {

    return this.api.get(

      '/orders/partner',

      queryParams

    );

  }

  // ==============================
  // UPDATE ORDER STATUS
  // ==============================
  updateStatus(

    id: string,

    status: string

  ): Observable<any> {

    return this.api.patch(

      `/orders/${id}/status`,

      { status }

    );

  }

  // ==============================
  // PLACE ORDER
  // ==============================
  placeOrder(
    data: any
  ): Observable<any> {

    return this.api.post(

      '/orders',

      data

    );

  }

  // ==============================
  // USER ORDERS
  // ==============================
  getUserOrders(

    userId: string,

    queryParams?: any

  ): Observable<any> {

    return this.api.get(

      `/orders/user/${userId}`,

      queryParams

    );

  }

  // ==============================
  // GET SINGLE ORDER
  // ==============================
  getOrderById(
    orderId: string
  ): Observable<any> {

    return this.api.get(

      `/orders/${orderId}`

    );

  }

}