export interface Coupon {

    _id: string;
  
    code: string;
  
    title?: string;
  
    description?: string;
  
    discountType:
  
      | 'percentage'
  
      | 'flat';
  
    discountValue: number;
  
    minimumOrderAmount?: number;
  
    maximumDiscount?: number;
  
    usageLimit?: number;
  
    usedCount?: number;
  
    isActive: boolean;
  
    applicableRestaurants?: string[];
  
    applicableUsers?: string[];
  
    expiryDate?: string;
  
    createdAt?: string;
  
    updatedAt?: string;
  
  }