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

  io.to(order.restaurantId)
    .emit('newOrder', order);

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

  const order =
    await Order.findByIdAndUpdate(

      req.params.id,

      { status },

      {
        returnDocument:
          'after'
      }

    );

  if (!order) {

    return errorResponse(

      res,

      'Order not found',

      404

    );

  }

  // SOCKET EVENT
  const io =
    req.app.get('io');

  io.to(order.restaurantId)
    .emit(

      'orderStatusUpdated',

      order

    );

  io.to(order._id.toString())
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