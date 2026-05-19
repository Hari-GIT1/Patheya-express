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
  // GET PARTNER ORDERS
  // ==============================
  getOrders():
  Observable<any> {

    return this.http.get(

      `${this.apiUrl}/orders/partner`

    );

  }

  // ==============================
  // UPDATE ORDER STATUS
  // ==============================
  updateStatus(

    id: string,

    status: string

  ): Observable<any> {

    return this.http.patch(

      `${this.apiUrl}/orders/${id}/status`,

      { status }

    );

  }

  // ==============================
  // PLACE ORDER
  // ==============================
  placeOrder(
    data: any
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/orders`,

      data

    );

  }

  // ==============================
  // USER ORDERS
  // ==============================
  getUserOrders(
    userId: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/orders/user/${userId}`

    );

  }

  // ==============================
  // GET SINGLE ORDER
  // ==============================
  getOrderById(
    orderId: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/orders/${orderId}`

    );

  }

}