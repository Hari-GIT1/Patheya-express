export interface Payment {

    _id: string;
  
    orderId: string;
  
    userId: string;
  
    restaurantId?: string;
  
    amount: number;
  
    currency?: string;
  
    paymentMethod:
  
      | 'razorpay'
  
      | 'cod'
  
      | 'wallet'
  
      | 'upi';
  
    paymentStatus:
  
      | 'pending'
  
      | 'paid'
  
      | 'failed'
  
      | 'refunded';
  
    transactionId?: string;
  
    razorpayOrderId?: string;
  
    razorpayPaymentId?: string;
  
    razorpaySignature?: string;
  
    refundId?: string;
  
    refundAmount?: number;
  
    paidAt?: string;
  
    createdAt?: string;
  
    updatedAt?: string;
  
  }