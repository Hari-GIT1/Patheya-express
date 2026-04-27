export interface CartItem {
    menuItemId: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }
  
  export interface Cart {
    restaurantId: string;
    items: CartItem[];
    totalAmount: number;
  }