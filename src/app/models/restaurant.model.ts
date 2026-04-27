import { Address } from "./address.model";

export interface Restaurant {
    id: string;
    name: string;
    description?: string;
  
    ownerId: string;
  
    cuisines: string[]; // ["South Indian", "Chinese"]
  
    address: Address;
  
    rating: number;
    totalRatings: number;
  
    isOpen: boolean;
  
    deliveryTime: number; // minutes
    preparationTime: number; // for pickup
  
    deliveryAvailable: boolean;
    pickupAvailable: boolean; // ⭐ YOUR FEATURE
  
    minimumOrderAmount: number;
  
    images: string[]
    image: string;
  
    createdAt: Date;
    updatedAt: Date;
  }