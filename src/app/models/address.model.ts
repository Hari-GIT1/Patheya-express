export interface Address {
    id: string;
    label: string; // Home, Work
    street: string;
    city: string;
    state: string;
    pincode: string;
  
    latitude?: number;
    longitude?: number;
  }