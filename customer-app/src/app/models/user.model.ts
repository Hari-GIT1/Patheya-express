import { Address } from "./address.model";

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
  
    role: 'customer' | 'restaurant_owner' | 'admin';
  
    addresses: Address[];
  
    createdAt: Date;
    updatedAt: Date;
  }