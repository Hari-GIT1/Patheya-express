import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderNotificationService {

  private ordersSubject = new BehaviorSubject<any[]>([]);
  orders$ = this.ordersSubject.asObservable();

  addOrder(order: any) {
    const current = this.ordersSubject.value;
    this.ordersSubject.next([order, ...current]);
  }

  removeOrder(id: string) {
    const filtered = this.ordersSubject.value.filter(o => o._id !== id);
    this.ordersSubject.next(filtered);
  }
}