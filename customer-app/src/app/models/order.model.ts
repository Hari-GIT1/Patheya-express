import { Address } from "./address.model";
import { OrderItem } from "./orderitem.model";

export interface Order {
    id: string;
  
    userId: string;
    restaurantId: string;
  
    items: OrderItem[];
  
    totalAmount: number;
  
    orderType: 'delivery' | 'pickup'; // ⭐ KEY FEATURE
  
    status:
      | 'placed'
      | 'accepted'
      | 'preparing'
      | 'ready'      // for pickup
      | 'out_for_delivery'
      | 'delivered'
      | 'cancelled';
  
    paymentStatus: 'pending' | 'paid' | 'failed';
  
    paymentMethod: 'online' | 'cod';
  
    deliveryAddress?: Address; // only for delivery
  
    estimatedTime?: number; // minutes
  
    createdAt: Date;
    updatedAt: Date;
  }