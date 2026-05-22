const Order =
  require('../../../models/Order');

const orderService =
  require(
    '../services/order.service'
  );

const asyncHandler =
  require(
    '../../../utils/asyncHandler'
  );

const {

  successResponse,

  errorResponse

} = require(
  '../../../utils/response'
);

const eventBus =
  require(
    '../../../core/events/eventBus'
  );

const orderEvents =
  require(
    '../events/order.events'
  );
const auditService =
  require(
    '../../../core/audit/audit.service'
  );

// ==============================
// GET ORDERS
// ==============================

exports.getOrders =
asyncHandler(async (

  req,

  res

) => {

  const data =
    await orderService
      .getOrders(
        req.query
      );

  successResponse(

    res,

    data,

    'Orders fetched'

  );

});

// ==============================
// PLACE ORDER
// ==============================

exports.placeOrder =
asyncHandler(async (

  req,

  res

) => {

  const order =
    await orderService
      .createOrder(

        req.user._id,

        req.body

      );

  // ==========================
  // EVENTS
  // ==========================

  eventBus.emit(

    orderEvents.ORDER_CREATED,

    order

  );

  successResponse(

    res,

    order,

    'Order created'

  );
  await auditService.log({

    action:
      'ORDER_CREATED',
  
    userId:
      req.user._id,
  
    entity:
      'Order',
  
    entityId:
      order._id,
  
    metadata: {
  
      total:
        order.total,
  
      restaurantId:
        order.restaurantId
  
    },
  
    req
  
  });

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
    await orderService
      .getPartnerOrders(

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
    await orderService
      .getUserOrders(

        req.user._id

      );

  successResponse(

    res,

    orders,

    'User orders fetched'

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

  const role =
    req.user.role;

  // ==========================
  // CUSTOMER ACCESS
  // ==========================

  if (

    role === 'customer' &&

    order.userId.toString() !==
    req.user._id.toString()

  ) {

    return errorResponse(

      res,

      'Unauthorized order access',

      403

    );

  }

  // ==========================
  // OWNER ACCESS
  // ==========================

  if (

    role === 'owner' &&

    order.restaurantId.toString() !==
    req.user.restaurantId.toString()

  ) {

    return errorResponse(

      res,

      'Unauthorized restaurant order access',

      403

    );

  }

  // ==========================
  // DELIVERY PARTNER ACCESS
  // ==========================

  if (

    role === 'delivery_partner'

  ) {

    if (

      !req.deliveryPartner ||

      !order.deliveryPartnerId ||

      order.deliveryPartnerId
        .toString()

      !==

      req.deliveryPartner._id
        .toString()

    ) {

      return errorResponse(

        res,

        'Unauthorized delivery order access',

        403

      );

    }

  }

  successResponse(

    res,

    order,

    'Order fetched'

  );

});

// ==============================
// UPDATE ORDER STATUS
// ==============================

exports.updateOrderStatus =
asyncHandler(async (

  req,

  res

) => {

  const { status } =
    req.body;

  // ==========================
  // STATUS REQUIRED
  // ==========================

  if (!status) {

    return errorResponse(

      res,

      'Status is required',

      400

    );

  }

  // ==========================
  // FIND ORDER
  // ==========================

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
  // FINALIZED ORDERS
  // ==========================

  if (

    [

      'delivered',

      'cancelled'

    ].includes(order.status)

  ) {

    return errorResponse(

      res,

      'Finalized orders cannot be updated',

      400

    );

  }

  // ==========================
  // OWNER VALIDATION
  // ==========================

  if (

    req.user.role === 'owner' &&

    order.restaurantId.toString()

    !==

    req.user.restaurantId.toString()

  ) {

    return errorResponse(

      res,

      'Unauthorized restaurant order update',

      403

    );

  }

  // ==========================
  // VALID TRANSITIONS
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

  // ==========================
  // INVALID CURRENT STATUS
  // ==========================

  if (!allowedStatuses) {

    return errorResponse(

      res,

      'Invalid current order status',

      400

    );

  }

  // ==========================
  // INVALID TRANSITION
  // ==========================

  if (

    !allowedStatuses.includes(
      status
    )

  ) {

    return errorResponse(

      res,

      `Cannot change status from ${order.status} to ${status}`,

      400

    );

  }

  // ==========================
  // PAYMENT VALIDATION
  // ==========================

  if (

    order.paymentMethod ===
    'online'

    &&

    [

      'accepted',

      'preparing',

      'ready'

    ].includes(status)

    &&

    order.paymentStatus !==
    'paid'

  ) {

    return errorResponse(

      res,

      'Order payment pending',

      400

    );

  }

  // ==========================
  // UPDATE STATUS
  // ==========================

  order.status = status;

  order.statusTimeline.push({

    status,

    changedAt:
      new Date()

  });

  // ==========================
  // TIMESTAMPS
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
  // EVENTS
  // ==========================

  eventBus.emit(

    orderEvents.ORDER_STATUS_UPDATED,

    order

  );

  successResponse(

    res,

    order,

    'Order status updated'

  );
  await auditService.log({

    action:
      'ORDER_STATUS_UPDATED',
  
    userId:
      req.user._id,
  
    entity:
      'Order',
  
    entityId:
      order._id,
  
    metadata: {
  
      status
  
    },
  
    req
  
  });

});