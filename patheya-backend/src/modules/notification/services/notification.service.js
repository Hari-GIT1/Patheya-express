const {

    orderCreatedJob,
  
    orderDeliveredJob
  
  } = require(
  
    '../../queue/jobs/order.job'
  
  );
  
  class NotificationService {
  
    // ==========================
    // ORDER CREATED
    // ==========================
  
    async orderCreated(order) {
  
      console.log(
  
        'NOTIFICATION:',
  
        'Order Created',
  
        order._id
  
      );
  
      await orderCreatedJob(
        order
      );
  
    }
  
    // ==========================
    // ORDER STATUS UPDATED
    // ==========================
  
    async orderStatusUpdated(
      order
    ) {
  
      console.log(
  
        'NOTIFICATION:',
  
        'Order Updated',
  
        order.status
  
      );
  
    }
  
    // ==========================
    // ORDER DELIVERED
    // ==========================
  
    async orderDelivered(
      order
    ) {
  
      console.log(
  
        'NOTIFICATION:',
  
        'Order Delivered',
  
        order._id
  
      );
  
      await orderDeliveredJob(
        order
      );
  
    }
  
  }
  
  module.exports =
    new NotificationService();