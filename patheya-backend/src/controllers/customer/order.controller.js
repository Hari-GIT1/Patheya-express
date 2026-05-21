const Order =
  require('../../models/Order');

const orderService =
  require(
    '../../services/order.service'
  );

const asyncHandler =
  require(
    '../../utils/asyncHandler'
  );

const {

  successResponse,

  errorResponse

} = require(
  '../../utils/response'
);

// ==============================
// PLACE ORDER
// ==============================
exports.placeOrder =
asyncHandler(async (

  req,

  res

) => {
  const order =
    await orderService.createOrder(

      req.user._id,

      req.body

    );

  // SOCKET EVENT
  const io =
    req.app.get('io');

    io.to(order.restaurantId.toString())
    .emit('newOrder', order);
  
  io.to('admins')
    .emit('adminNewOrder', {
      type: 'NEW_ORDER',
      order
    });

  successResponse(

    res,

    order,

    'Order created'

  );

});

// ==============================
// PARTNER ORDERS
// ==============================
exports.getPartnerOrders =
asyncHandler(async (

  req,

  res

) => {

  const orders =
    await orderService.getPartnerOrders(

      req.user.restaurantId

    );

  successResponse(

    res,

    orders,

    'Partner orders fetched'

  );

});

// ==============================
// CUSTOMER ORDERS
// ==============================
exports.getUserOrders =
asyncHandler(async (

  req,

  res

) => {

  const orders =
    await orderService.getUserOrders(

      req.user._id

    );
    console.log(req.params.userId);
    console.log(orders);

  successResponse(

    res,

    orders,

    'User orders fetched'

  );

});

// ==============================
// RESTAURANT ORDERS
// ==============================
exports.getRestaurantOrders =
asyncHandler(async (

  req,

  res

) => {

  const orders =
    await Order.find({

      restaurantId:
        req.params.restaurantId

    }).sort({

      createdAt: -1

    });

  successResponse(

    res,

    orders,

    'Restaurant orders fetched'

  );

});

// ==============================
// GET SINGLE ORDER
// ==============================
exports.getOrderById =
asyncHandler(async (

  req,

  res

) => {

  const order =
    await Order.findById(
      req.params.id
    );

  if (!order) {

    return errorResponse(

      res,

      'Order not found',

      404

    );

  }

  successResponse(

    res,

    order,

    'Order fetched'

  );

});

// ==============================
// UPDATE STATUS
// ==============================
exports.updateOrderStatus =
asyncHandler(async (

  req,

  res

) => {

  const { status } =
    req.body;

  // ==========================
  // FIND ORDER
  // ==========================

  const order =
    await Order.findById(
      req.params.id
    );

  if (!order) {

    return errorResponse(

      res,

      'Order not found',

      404

    );

  }

  // ==========================
  // VALID STATUS FLOW
  // ==========================

  const validTransitions = {

    placed: [
      'accepted',
      'cancelled'
    ],

    accepted: [
      'preparing',
      'cancelled'
    ],

    preparing: [
      'ready'
    ],
    
    ready: [
      'out_for_delivery'
    ],

    out_for_delivery: [
      'delivered'
    ],

    delivered: [],

    cancelled: []

  };

  const allowedStatuses =
    validTransitions[
      order.status
    ];

  if (
    !allowedStatuses.includes(status)
  ) {

    return errorResponse(

      res,

      `Cannot change status from ${order.status} to ${status}`,

      400

    );

  }

  // ==========================
  // UPDATE STATUS
  // ==========================

  order.status = status;

  // ==========================
  // TIMELINE
  // ==========================

  order.statusTimeline.push({

    status,

    changedAt: new Date()

  });

  // ==========================
  // STATUS TIMESTAMPS
  // ==========================

  if (status === 'accepted') {

    order.acceptedAt =
      new Date();

  }

  if (status === 'preparing') {

    order.preparingAt =
      new Date();

  }
  if (status === 'ready') {

    order.readyAt =
      new Date();

  }


  if (
    status ===
    'out_for_delivery'
  ) {

    order.outForDeliveryAt =
      new Date();

  }

  if (status === 'delivered') {

    order.deliveredAt =
      new Date();

  }

  if (status === 'cancelled') {

    order.cancelledAt =
      new Date();

  }

  // ==========================
  // SAVE
  // ==========================

  await order.save();

  // ==========================
  // SOCKET EVENTS
  // ==========================

  const io =
    req.app.get('io');

  // RESTAURANT ROOM
  io.to(
    order.restaurantId.toString()
  )

  .emit(
    'orderStatusUpdated',
    order
  );

  // ADMIN ROOM
  io.to('admins')

  .emit(
    'adminOrderUpdated',
    {

      type: 'ORDER_UPDATED',

      orderId: order._id,

      status: order.status,

      order

    }
  );

  // CUSTOMER ORDER ROOM
  io.to(
    order._id.toString()
  )

  .emit(
    'orderStatusUpdated',
    order
  );

  successResponse(

    res,

    order,

    'Order status updated'

  );

});