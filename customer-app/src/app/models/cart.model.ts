export interface CartItem {

  menuItemId: string;

  restaurantId: string;

  name: string;

  description?: string;

  image?: string;

  category?: string;

  price: number;

  quantity: number;

  isAvailable?: boolean;

  customization?: {

    spiceLevel?: string;

    addons?: string[];

    instructions?: string;

  };

}

export interface Cart {

  restaurantId: string;

  restaurantName?: string;

  items: CartItem[];

  subtotal: number;

  deliveryFee?: number;

  taxes?: number;

  discount?: number;

  grandTotal: number;

  couponCode?: string;

  paymentMethod?: string;

  createdAt?: string;

  updatedAt?: string;

}