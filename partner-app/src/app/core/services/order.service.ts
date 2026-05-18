import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ✅ GET PARTNER ORDERS
  getOrders():Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/orders/partner`
    );

  }

  // ✅ UPDATE ORDER STATUS
  updateStatus(
    id: string,
    status: string
  ) {

    return this.http.patch<any>(

      `${this.apiUrl}/orders/${id}/status`,

      { status }

    );

  }

}