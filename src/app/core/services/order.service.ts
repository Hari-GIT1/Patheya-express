import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {

  private baseUrl = `${environment.api.baseUrl}/orders`;

  constructor(private http: HttpClient) {}

 // 🛒 PLACE ORDER
  placeOrder(order: any) {
    const token = localStorage.getItem('token');

    return this.http.post(this.baseUrl, order, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // 📦 GET SINGLE ORDER
  getOrder(id: string) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // 🍽️ GET RESTAURANT ORDERS
  getRestaurantOrders(restaurantId: string) {
    return this.http.get<any[]>(
      `${this.baseUrl}/restaurant/${restaurantId}`
    );
  }

  // 🔄 UPDATE ORDER STATUS
  updateOrderStatus(orderId: string, status: string) {
    return this.http.put(
      `${this.baseUrl}/${orderId}/status`,
      { status }
    );
  }

  // 👤 GET USER ORDERS
  getUserOrders(userId: string) {
    return this.http.get<any[]>(
      `${this.baseUrl}/user/${userId}`
    );
  }
}