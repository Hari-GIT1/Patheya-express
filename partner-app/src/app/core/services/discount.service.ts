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

export class DiscountService {

  apiUrl =
    environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  // ==============================
  // CREATE DISCOUNT
  // ==============================
  createDiscount(
    data: any
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/discounts`,

      data

    );

  }

  // ==============================
  // GET DISCOUNTS
  // ==============================
  getDiscounts():
  Observable<any> {

    return this.http.get(

      `${this.apiUrl}/discounts`

    );

  }

}