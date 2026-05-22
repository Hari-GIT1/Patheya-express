const notificationService =
  require(
    '../../notification/services/notification.service'
  );

class SocketService {

    constructor(io) {
  
      this.io = io;
  
    }
  
    // ==========================
    // EMIT TO ROOM
    // ==========================
  
    emitToRoom(
  
      room,
  
      event,
  
      data
  
    ) {
  
      this.io.to(room)
        .emit(event, data);
  
    }
  
    // ==========================
    // EMIT TO ADMINS
    // ==========================
  
    emitToAdmins(
  
      event,
  
      data
  
    ) {
  
      this.io.to('admins')
        .emit(event, data);
  
    }
  
    // ==========================
    // ORDER STATUS UPDATE
    // ==========================
  
    emitOrderStatusUpdate(
      order
    ) {
        notificationService
        .orderStatusUpdated(order);
  
      // CUSTOMER
      this.emitToRoom(
  
        order._id.toString(),
  
        'orderStatusUpdated',
  
        order
  
      );
  
      // RESTAURANT
      this.emitToRoom(
  
        order.restaurantId.toString(),
  
        'orderStatusUpdated',
  
        order
  
      );
  
      // ADMINS
      this.emitToAdmins(
  
        'adminOrderUpdated',
  
        {
  
          type:
            'ORDER_UPDATED',
  
          orderId:
            order._id,
  
          status:
            order.status,
  
          order
  
        }
  
      );
  
    }
  
    // ==========================
    // NEW ORDER
    // ==========================
  
    emitNewOrder(order) {

        notificationService
        .orderCreated(order);
  
      // RESTAURANT
      this.emitToRoom(
  
        order.restaurantId.toString(),
  
        'newOrder',
  
        order
  
      );
  
      // ADMINS
      this.emitToAdmins(
  
        'adminNewOrder',
  
        {
  
          type:
            'NEW_ORDER',
  
          order
  
        }
  
      );
  
    }
  
    // ==========================
    // DELIVERY ACCEPTED
    // ==========================
  
    emitDeliveryAccepted(
      order
    ) {
  
      this.emitToRoom(
  
        order._id.toString(),
  
        'deliveryAccepted',
  
        order
  
      );
  
      this.emitToRoom(
  
        order.restaurantId.toString(),
  
        'deliveryAccepted',
  
        order
  
      );
  
      this.emitToAdmins(
  
        'deliveryAccepted',
  
        order
  
      );
  
    }
  
    // ==========================
    // ORDER DELIVERED
    // ==========================
  
    emitOrderDelivered(
      order
    ) {
        notificationService
        .orderDelivered(order);
  
      this.emitToRoom(
  
        order._id.toString(),
  
        'orderDelivered',
  
        order
  
      );
  
      this.emitToRoom(
  
        order.restaurantId.toString(),
  
        'orderDelivered',
  
        order
  
      );
  
      this.emitToAdmins(
  
        'orderDelivered',
  
        order
  
      );
  
    }
  
  }
  
  module.exports =
    SocketService;