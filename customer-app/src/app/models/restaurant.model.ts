import {

  Address

} from './address.model';

export interface Restaurant {

  _id: string;

  ownerId: string;

  name: string;

  slug?: string;

  description?: string;

  shortDescription?: string;

  cuisines: string[];

  tags?: string[];

  address: Address;

  phone?: string;

  email?: string;

  website?: string;

  image?: string;

  coverImage?: string;

  gallery?: string[];

  rating?: number;

  totalRatings?: number;

  totalReviews?: number;

  totalOrders?: number;

  isOpen: boolean;

  isFeatured?: boolean;

  isVerified?: boolean;

  deliveryTime?: number;

  preparationTime?: number;

  deliveryAvailable: boolean;

  pickupAvailable: boolean;

  deliveryFee?: number;

  minimumOrderAmount?: number;

  averagePriceForTwo?: number;

  openingHours?: {

    open: string;

    close: string;

  };

  location?: {

    latitude: number;

    longitude: number;

  };

  offers?: {

    title: string;

    description?: string;

  }[];

  settings?: {

    acceptsOnlinePayment?: boolean;

    acceptsCOD?: boolean;

    autoAcceptOrders?: boolean;

  };

  createdAt?: string;

  updatedAt?: string;

}