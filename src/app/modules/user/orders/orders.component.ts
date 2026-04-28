import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user._id) return;

    this.orderService.getUserOrders(user._id).subscribe({
      next: (res: any[]) => (this.orders = res),
      error: (err: any) => console.error(err),
    });
  }

  trackOrder(id: string) {
    this.router.navigate(['/track-order', id]);
  }
  reorder(order: any) {
    this.cartService.clearCart();

    order.items.forEach((item: any) => {
      this.cartService.addToCart(item, order.restaurantId);
    });

    this.router.navigate(['/checkout']);
  }
  getETA(status: string) {
    switch (status) {
      case 'placed':
        return '30 mins';
      case 'preparing':
        return '20 mins';
      case 'out_for_delivery':
        return '10 mins';
      default:
        return 'Delivered';
    }
  }
  selectedFilter = 'all';

  get filteredOrders() {
    if (this.selectedFilter === 'all') return this.orders;

    return this.orders.filter((o) => o.status === this.selectedFilter);
  }
  saveAddress(address: string) {
    localStorage.setItem('address', address);
  }

  getAddress() {
    return localStorage.getItem('address');
  }
  selectedOrder: any = null;
  showReviewModal: boolean = false;

  rating: number = 5;
  review: string = '';
  setRating(val: number) {
    this.rating = val;
  }

  openReview(order: any) {
    this.selectedOrder = order;
    this.showReviewModal = true;
  }
  submitReview() {
    this.orderService.submitReview(
      this.selectedOrder._id,
      {
        rating: this.rating,
        review: this.review
      }
    ).subscribe(() => {
  
      this.selectedOrder.rating = this.rating;
  
      this.showReviewModal = false;
      this.review = '';
  
    });
  }
}