import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { SocketService } from '../../../core/services/socket.service';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss']

})
export class TrackOrderComponent implements OnInit {

  order: any;
  deliveryLocation = { lat: 12.9716, lng: 77.5946 }; // rider
destination = { lat: 12.9616, lng: 77.5846 };      // customer

zoom = 14;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.drawRoute();
    const orderId = this.route.snapshot.paramMap.get('id');

    if (!orderId) return;

    this.socketService.joinOrder(orderId);

    this.orderService.getOrder(orderId).subscribe({
      next: (res: any) => {
        this.order = res;
      },
      error: (err) => console.error(err)
    });

    this.socketService.onOrderStatusUpdate((updated: any) => {
      if (updated._id === orderId) {
        this.order = updated;
      }
    });
    setInterval(() => {
      this.deliveryLocation = {
        lat: this.deliveryLocation.lat + (Math.random() - 0.5) * 0.001,
        lng: this.deliveryLocation.lng + (Math.random() - 0.5) * 0.001
      };
    }, 2000);
  }

  get steps() {
    return [
      { key: 'placed', label: 'Order Placed' },
      { key: 'preparing', label: 'Preparing' },
      { key: 'out_for_delivery', label: 'Out for Delivery' },
      { key: 'delivered', label: 'Delivered' }
    ];
  }
  
  getProgressIndex(status: string) {
    const keys = this.steps.map(s => s.key);
    return keys.indexOf(status);
  }
  
  // 🔥 Fake ETA (can replace with real later)
  get eta() {
    if (!this.order?.createdAt) return '';
  
    const created = new Date(this.order.createdAt).getTime();
    const eta = new Date(created + 30 * 60000); // +30 mins
  
    return eta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  directionsService = new google.maps.DirectionsService();
directionsResult: google.maps.DirectionsResult | undefined;
drawRoute() {
  this.directionsService.route(
    {
      origin: this.deliveryLocation,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING
    },
    (result, status) => {
      if (status === 'OK' && result) {
        this.directionsResult = result;
      }
    }
  );
}
}