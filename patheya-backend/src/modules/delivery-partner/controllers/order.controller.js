const asyncHandler =
  require(
    '../../../core/utils/asyncHandler'
  );

const {

  successResponse

} = require(
  '../../../core/responses/response'
);

const eventBus =
  require(
    '../../../core/events/eventBus'
  );

const orderEvents =
  require(
    '../../order/events/order.events'
  );

const orderService =
  require(
    '../services/auth.service'
  );

// ==============================
// AVAILABLE ORDERS
// ==============================

exports.getAvailableOrders =
asyncHandler(async (

  req,

  res

) => {

  const orders =
    await orderService
      .getAvailableOrders();

  successResponse(

    res,

    orders,

    'Available orders fetched'

  );

});

// ==============================
// MY ORDERS
// ==============================

exports.getMyOrders =
asyncHandler(async (

  req,

  res

) => {

  const orders =
    await orderService
      .getMyOrders(

        req.deliveryPartner._id

      );

  successResponse(

    res,

    orders,

    'My delivery orders fetched'

  );

});

// ==============================
// ACCEPT DELIVERY
// ==============================

exports.acceptDelivery =
asyncHandler(async (

  req,

  res

) => {

  const order =
    await orderService
      .acceptDelivery(

        req.params.id,

        req.deliveryPartner._id

      );

  // SOCKETS

  const socketService =
    req.app.get(
      'socketService'
    );

  if (socketService) {

    socketService
      .emitDeliveryAccepted(
        order
      );

    socketService
      .emitOrderStatusUpdate(
        order
      );

  }

  successResponse(

    res,

    order,

    'Delivery accepted'

  );

});

// ==============================
// MARK DELIVERED
// ==============================

exports.markDelivered =
asyncHandler(async (

  req,

  res

) => {

  const order =
    await orderService
      .markDelivered(

        req.params.id,

        req.deliveryPartner._id

      );

  // EVENTS

  eventBus.emit(

    orderEvents.ORDER_DELIVERED,

    order

  );

  // SOCKETS

  const socketService =
    req.app.get(
      'socketService'
    );

  if (socketService) {

    socketService
      .emitOrderStatusUpdate(
        order
      );

  }

  successResponse(

    res,

    order,

    'Order delivered'

  );

});