export interface OrderItem {

  menuItemId: string;

  name: string;

  image?: string;

  category?: string;

  quantity: number;

  price: number;

  totalPrice?: number;

  customization?: {

    spiceLevel?: string;

    addons?: {

      name: string;

      price: number;

    }[];

    instructions?: string;

  };

}