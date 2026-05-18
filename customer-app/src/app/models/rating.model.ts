export interface Review {
    id: string;
    userId: string;
    restaurantId: string;
  
    rating: number; // 1–5
    comment?: string;
  
    createdAt: Date;
  }