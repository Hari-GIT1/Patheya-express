import { Injectable }
from '@angular/core';

import { HttpClient }
from '@angular/common/http';

import { environment }
from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  private apiUrl =
    `${environment.apiBaseUrl}/admin/orders`;

  constructor(
    private http: HttpClient
  ) {}

  getOrders() {

    return this.http.get(
      this.apiUrl
    );

  }
  updateOrderStatus(
    orderId: string,
    status: string
  ) {
  
    return this.http.patch(
  
      `${this.apiUrl}/${orderId}/status`,
  
      { status }
  
    );
  
  }

}