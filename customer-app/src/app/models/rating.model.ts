export interface Review {

  _id: string;

  userId: string;

  userName?: string;

  userAvatar?: string;

  restaurantId: string;

  orderId?: string;

  rating: number;

  comment?: string;

  images?: string[];

  likes?: number;

  isEdited?: boolean;

  ownerReply?: {

    message: string;

    repliedAt: string;

  };

  createdAt?: string;

  updatedAt?: string;

}