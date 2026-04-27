export interface MenuItem {
    id: string;
    restaurantId: string;
  
    name: string;
    description?: string;
  
    price: number;
  
    category: string; // "Starters", "Main Course"
  
    isVeg: boolean;
    isAvailable: boolean;
  
    image?: string;
  
    createdAt: Date;
    updatedAt: Date;
  }