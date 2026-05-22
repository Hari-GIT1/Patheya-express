import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  environment
} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  apiUrl =
    environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  // ==============================
  // AVAILABLE ORDERS
  // ==============================

  getAvailableOrders():
  Observable<any> {

    return this.http.get(

      `${this.apiUrl}/delivery/orders/available`

    );

  }

  // ==============================
  // MY DELIVERIES
  // ==============================

  getMyOrders():
  Observable<any> {

    return this.http.get(

      `${this.apiUrl}/delivery/orders/my-orders`

    );

  }

  // ==============================
  // ACCEPT DELIVERY
  // ==============================

  acceptOrder(
    orderId: string
  ): Observable<any> {

    return this.http.patch(

      `${this.apiUrl}/delivery/orders/${orderId}/accept`,

      {}

    );

  }

  // ==============================
  // MARK DELIVERED
  // ==============================

  markDelivered(
    orderId: string
  ): Observable<any> {

    return this.http.patch(

      `${this.apiUrl}/delivery/orders/${orderId}/delivered`,

      {}

    );

  }

}