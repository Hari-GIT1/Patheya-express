export interface DeliveryPartner {
    id: string;
    name: string;
    phone: string;
  
    isAvailable: boolean;
  
    currentLocation?: {
      latitude: number;
      longitude: number;
    };
  }