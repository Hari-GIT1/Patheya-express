const adminOrderService =
  require(
    '../services/adminOrderService'
  );

const asyncHandler =
  require(
    '../../../utils/asyncHandler'
  );

const ApiError =
  require(
    '../../../core/errors/ApiError'
  );

const Order =
  require(
    '../../../models/Order'
  );

const {

  successResponse

} = require(
  '../../../utils/response'
);

// ==============================
// GET ORDERS
// ==============================

exports.getOrders =
asyncHandler(async (

  req,

  res

) => {

  const orders =
    await adminOrderService
      .getOrders(

        req.query

      );

  successResponse(

    res,

    orders,

    'Orders fetched'

  );

});

// ==============================
// GET LIVE ORDERS
// ==============================

exports.getLiveOrders =
asyncHandler(async (

  req,

  res

) => {

  const orders =
    await adminOrderService
      .getLiveOrders();

  successResponse(

    res,

    orders,

    'Live orders fetched'

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

  const order =
    await Order.findByIdAndUpdate(

      req.params.id,

      {

        status

      },

      {

        new: true

      }

    );

  if (!order) {

    throw new ApiError(

      404,

      'Order not found'

    );

  }

  // ==========================
  // SOCKET EVENTS
  // ==========================

  const socketService =
    req.app.get(
      'socketService'
    );

  socketService
    .emitOrderStatusUpdate(
      order
    );

  successResponse(

    res,

    order,

    'Order status updated'

  );

});