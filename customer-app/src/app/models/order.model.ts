import {

  Address

} from './address.model';

import {

  OrderItem

} from './orderitem.model';

export interface Order {

  _id: string;

  orderNumber?: string;

  userId: string;

  restaurantId: string;

  deliveryPartnerId?: string;

  restaurantName?: string;

  items: OrderItem[];

  subtotal: number;

  deliveryFee?: number;

  taxes?: number;

  discount?: number;

  totalAmount: number;

  orderType:
    'delivery' |
    'pickup';

  status:

    | 'placed'

    | 'accepted'

    | 'preparing'

    | 'ready'

    | 'out_for_delivery'

    | 'delivered'

    | 'cancelled';

  paymentStatus:

    | 'pending'

    | 'paid'

    | 'failed'

    | 'refunded';

  paymentMethod:

    | 'online'

    | 'cod'

    | 'wallet';

  paymentId?: string;

  couponCode?: string;

  deliveryAddress?: Address;

  deliveryInstructions?: string;

  estimatedTime?: number;

  actualDeliveryTime?: number;

  riderLocation?: {

    latitude: number;

    longitude: number;

  };

  timeline?: {

    placedAt?: string;

    acceptedAt?: string;

    preparingAt?: string;

    pickedAt?: string;

    deliveredAt?: string;

    cancelledAt?: string;

  };

  createdAt?: string;

  updatedAt?: string;

}