import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {

  constructor(private http: HttpClient) {}


  placeOrder(order: any) {
    const token = localStorage.getItem('token');
  
    return this.http.post('http://192.168.10.232:3000/api/orders', order, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  getOrder(id: string) {
    return this.http.get<any>(`http://192.168.10.232:3000/api/orders/${id}`);
  }
  getRestaurantOrders(restaurantId: string) {
    return this.http.get<any[]>(`http://192.168.10.232:3000/api/orders/restaurant/${restaurantId}`);
  }
  
  updateOrderStatus(orderId: string, status: string) {
    return this.http.put(`http://192.168.10.232:3000/api/orders/${orderId}/status`, { status });
  }
  getUserOrders(userId: string) {
    return this.http.get<any[]>(`http://192.168.10.232:3000/api/orders/user/${userId}`);
  }
}