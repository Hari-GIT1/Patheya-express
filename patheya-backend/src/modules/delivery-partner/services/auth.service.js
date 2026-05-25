const Order =
  require('../../order/models/Order');

const ApiError =
  require(
    '../../../core/errors/ApiError'
  );

// ==============================
// AVAILABLE ORDERS
// ==============================

exports.getAvailableOrders =
async () => {

  return await Order.find({

    status: 'ready',

    deliveryPartnerId: null

  })

  .populate(

    'restaurantId',

    'name'

  )

  .sort({

    createdAt: -1

  });

};

// ==============================
// MY ORDERS
// ==============================

exports.getMyOrders =
async (deliveryPartnerId) => {

  return await Order.find({

    deliveryPartnerId,

    status: {

      $ne: 'delivered'

    }

  })

  .populate(

    'restaurantId',

    'name'

  )

  .sort({

    createdAt: -1

  });

};

// ==============================
// ACCEPT DELIVERY
// ==============================

exports.acceptDelivery =
async (

  orderId,

  deliveryPartnerId

) => {

  const order =
    await Order.findById(
      orderId
    );

  if (!order) {

    throw new ApiError(

      404,

      'Order not found'

    );

  }

  if (

    order.status !==
    'ready'

  ) {

    throw new ApiError(

      400,

      'Order is not ready'

    );

  }

  if (

    order.deliveryPartnerId

  ) {

    throw new ApiError(

      400,

      'Order already assigned'

    );

  }

  order.deliveryPartnerId =
    deliveryPartnerId;

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

  return order;

};

// ==============================
// MARK DELIVERED
// ==============================

exports.markDelivered =
async (

  orderId,

  deliveryPartnerId

) => {

  const order =
    await Order.findById(
      orderId
    );

  if (!order) {

    throw new ApiError(

      404,

      'Order not found'

    );

  }

  if (

    order
      .deliveryPartnerId
      ?.toString()

    !==

    deliveryPartnerId
      .toString()

  ) {

    throw new ApiError(

      403,

      'Unauthorized access'

    );

  }

  if (

    order.status !==
    'out_for_delivery'

  ) {

    throw new ApiError(

      400,

      'Invalid order state'

    );

  }

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

  return order;

};