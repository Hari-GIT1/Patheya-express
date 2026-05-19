import {

  Address

} from './address.model';

export interface User {

  _id: string;

  name: string;

  email: string;

  phone: string;

  avatar?: string;

  role:

    | 'customer'

    | 'restaurant_owner'

    | 'delivery_partner'

    | 'admin';

  isVerified?: boolean;

  isBlocked?: boolean;

  addresses?: Address[];

  defaultAddressId?: string;

  favoriteRestaurants?: string[];

  walletBalance?: number;

  loyaltyPoints?: number;

  totalOrders?: number;

  lastLogin?: string;

  notificationPreferences?: {

    email?: boolean;

    sms?: boolean;

    push?: boolean;

  };

  createdAt?: string;

  updatedAt?: string;

}