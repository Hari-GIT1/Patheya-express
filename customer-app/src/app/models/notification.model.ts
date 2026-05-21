export interface Notification {

    _id: string;
  
    userId: string;
  
    title: string;
  
    message: string;
  
    type:
  
      | 'order'
  
      | 'payment'
  
      | 'offer'
  
      | 'delivery'
  
      | 'system';
  
    isRead: boolean;
  
    image?: string;
  
    actionUrl?: string;
  
    metadata?: any;
  
    createdAt?: string;
  
    updatedAt?: string;
  
  }