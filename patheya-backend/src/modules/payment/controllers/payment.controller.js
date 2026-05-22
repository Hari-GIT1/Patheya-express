const asyncHandler =
  require(
    '../../../utils/asyncHandler'
  );

const {

  successResponse

} = require(
  '../../../utils/response'
);

const paymentService =
  require(
    '../services/payment.service'
  );

// ==============================
// CREATE PAYMENT ORDER
// ==============================

exports.createPaymentOrder =
asyncHandler(async (

  req,

  res

) => {

  const razorpayOrder =
    await paymentService
      .createPaymentOrder(

        req.params.orderId,

        req.user._id

      );

  successResponse(

    res,

    razorpayOrder,

    'Payment order created'

  );

});

// ==============================
// VERIFY PAYMENT
// ==============================

exports.verifyPayment =
asyncHandler(async (

  req,

  res

) => {

  const order =
    await paymentService
      .verifyPayment(

        req.body,

        req.user._id

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

    'Payment verified successfully'

  );

});