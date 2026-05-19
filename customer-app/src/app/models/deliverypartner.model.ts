export interface DeliveryPartner {

  _id: string;

  name: string;

  phone: string;

  email?: string;

  avatar?: string;

  vehicleType?:
    'Bike' |
    'Scooter' |
    'Cycle';

  vehicleNumber?: string;

  isAvailable: boolean;

  isOnline?: boolean;

  currentLocation?: {

    latitude: number;

    longitude: number;

    updatedAt?: string;

  };

  rating?: number;

  totalDeliveries?: number;

  currentOrderId?: string;

  createdAt?: string;

  updatedAt?: string;

}