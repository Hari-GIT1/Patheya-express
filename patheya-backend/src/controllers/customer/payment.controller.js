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

const paymentService =
  require(
    '../../services/payment.service'
  );

// ==============================
// CREATE PAYMENT ORDER
// ==============================
exports.createPaymentOrder =
asyncHandler(async (

  req,

  res

) => {

  const order =
    await paymentService
      .createPaymentOrder(

        req.body.amount

      );

  successResponse(

    res,

    order,

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

  const isAuthentic =
    await paymentService
      .verifyPayment(

        req.body

      );

  if (!isAuthentic) {

    return errorResponse(

      res,

      'Invalid payment signature',

      400

    );

  }

  successResponse(

    res,

    {

      verified: true

    },

    'Payment verified'

  );

});