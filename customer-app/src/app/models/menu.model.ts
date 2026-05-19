export interface MenuItem {

  _id: string;

  restaurantId: string;

  name: string;

  slug?: string;

  description?: string;

  shortDescription?: string;

  price: number;

  discountedPrice?: number;

  category: string;

  cuisines?: string[];

  tags?: string[];

  isVeg: boolean;

  isAvailable: boolean;

  isFeatured?: boolean;

  preparationTime?: number;

  calories?: number;

  image?: string;

  gallery?: string[];

  rating?: number;

  totalReviews?: number;

  totalOrders?: number;

  customization?: {

    spiceLevels?: string[];

    addons?: {

      name: string;

      price: number;

    }[];

  };

  createdAt?: string;

  updatedAt?: string;

}