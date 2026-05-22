const Order =
  require('../../../models/Order');

const asyncHandler =
  require('../../../utils/asyncHandler');

const {

  successResponse,

  errorResponse

} = require('../../../utils/response');

const eventBus =
  require(
    '../../../core/events/eventBus'
  );

const orderEvents =
  require(
    '../../order/events/order.events'
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
    await Order.find({

      status: 'ready',

      deliveryPartnerId: null

    })

    .sort({

      createdAt: -1

    });

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
    await Order.find({

      deliveryPartnerId:
        req.deliveryPartner._id,

      status: {

        $ne: 'delivered'

      }

    })

    .sort({

      createdAt: -1

    });

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
    await Order.findById(
      req.params.id
    );

  // ==========================
  // ORDER NOT FOUND
  // ==========================

  if (!order) {

    return errorResponse(

      res,

      'Order not found',

      404

    );

  }

  // ==========================
  // ORDER STATUS CHECK
  // ==========================

  if (

    order.status !== 'ready'

  ) {

    return errorResponse(

      res,

      'Order is not ready',

      400

    );

  }

  // ==========================
  // DOUBLE ASSIGNMENT PROTECTION
  // ==========================

  if (

    order.deliveryPartnerId

  ) {

    return errorResponse(

      res,

      'Order already assigned',

      400

    );

  }

  // ==========================
  // UPDATE ORDER
  // ==========================

  order.deliveryPartnerId =
    req.deliveryPartner._id;

  order.status =
    'out_for_delivery';

  order.outForDeliveryAt =
    new Date();

  order.statusTimeline.push({

    status:
      'out_for_delivery',

    changedAt:
      new Date()

  });

  await order.save();

  // ==========================
  // SOCKET EVENTS
  // ==========================

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
    await Order.findById(
      req.params.id
    );

  // ==========================
  // ORDER NOT FOUND
  // ==========================

  if (!order) {

    return errorResponse(

      res,

      'Order not found',

      404

    );

  }

  // ==========================
  // OWNERSHIP VALIDATION
  // ==========================

  if (

    order
      .deliveryPartnerId
      ?.toString()

    !==

    req.deliveryPartner
      ._id
      .toString()

  ) {

    return errorResponse(

      res,

      'Unauthorized delivery access',

      403

    );

  }

  // ==========================
  // STATUS VALIDATION
  // ==========================

  if (

    order.status !==
    'out_for_delivery'

  ) {

    return errorResponse(

      res,

      'Invalid order status',

      400

    );

  }

  // ==========================
  // UPDATE ORDER
  // ==========================

  order.status =
    'delivered';

  order.deliveredAt =
    new Date();

  order.statusTimeline.push({

    status:
      'delivered',

    changedAt:
      new Date()

  });

  await order.save();

  // ==========================
  // EVENTS
  // ==========================

  eventBus.emit(

    orderEvents.ORDER_DELIVERED,

    order

  );

  // ==========================
  // SOCKET EVENTS
  // ==========================

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