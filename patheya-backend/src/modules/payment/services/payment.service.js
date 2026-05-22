const Order =
  require('../../../models/Order');

const razorpayService =
  require(
    './razorpay.service'
  );

const ApiError =
  require(
    '../../../core/errors/ApiError'
  );

// ==============================
// CREATE PAYMENT ORDER
// ==============================

exports.createPaymentOrder =
async (

  orderId,

  userId

) => {

  // ==========================
  // FIND ORDER
  // ==========================

  const order =
    await Order.findById(
      orderId
    );

  // ==========================
  // ORDER NOT FOUND
  // ==========================

  if (!order) {

    throw new ApiError(

      404,

      'Order not found'

    );

  }

  // ==========================
  // VERIFY OWNER
  // ==========================

  if (

    order.userId.toString() !==
    userId.toString()

  ) {

    throw new ApiError(

      403,

      'Unauthorized payment attempt'

    );

  }

  // ==========================
  // INVALID ORDER STATE
  // ==========================

  if (

    [

      'cancelled',

      'delivered'

    ].includes(order.status)

  ) {

    throw new ApiError(

      400,

      'Invalid order state for payment'

    );

  }

  // ==========================
  // PREVENT DUPLICATE PAYMENTS
  // ==========================

  if (

    order.paymentStatus ===
    'paid'

  ) {

    throw new ApiError(

      400,

      'Order already paid'

    );

  }

  // ==========================
  // PREVENT INVALID TOTAL
  // ==========================

  if (

    !order.total ||

    order.total <= 0

  ) {

    throw new ApiError(

      400,

      'Invalid order amount'

    );

  }

  // ==========================
  // CREATE RAZORPAY ORDER
  // ==========================

  const razorpayOrder =
    await razorpayService
      .createOrder({

        amount:
          Math.round(order.total * 100),

        currency: 'INR',

        receipt:
          `order_${order._id}`

      });

  // ==========================
  // SAVE ORDER DETAILS
  // ==========================

  order.paymentDetails = {

    ...order.paymentDetails,

    razorpayOrderId:
      razorpayOrder.id

  };

  await order.save();

  return razorpayOrder;

};

// ==============================
// VERIFY PAYMENT
// ==============================

exports.verifyPayment =
async (

  paymentData,

  userId

) => {

  const {

    razorpay_order_id,

    razorpay_payment_id,

    razorpay_signature

  } = paymentData;

  // ==========================
  // REQUIRED FIELDS
  // ==========================

  if (

    !razorpay_order_id ||

    !razorpay_payment_id ||

    !razorpay_signature

  ) {

    throw new ApiError(

      400,

      'Missing payment details'

    );

  }

  // ==========================
  // VERIFY SIGNATURE
  // ==========================

  const isValid =
    razorpayService
      .verifySignature({

        razorpay_order_id,

        razorpay_payment_id,

        razorpay_signature

      });

  if (!isValid) {

    throw new ApiError(

      400,

      'Invalid payment signature'

    );

  }

  // ==========================
  // FIND ORDER
  // ==========================

  const order =
    await Order.findOne({

      'paymentDetails.razorpayOrderId':
        razorpay_order_id

    });

  // ==========================
  // ORDER NOT FOUND
  // ==========================

  if (!order) {

    throw new ApiError(

      404,

      'Order not found'

    );

  }

  // ==========================
  // VERIFY OWNER
  // ==========================

  if (

    order.userId.toString() !==
    userId.toString()

  ) {

    throw new ApiError(

      403,

      'Unauthorized payment verification'

    );

  }

  // ==========================
  // INVALID ORDER STATE
  // ==========================

  if (

    [

      'cancelled',

      'delivered'

    ].includes(order.status)

  ) {

    throw new ApiError(

      400,

      'Invalid order state'

    );

  }

  // ==========================
  // IDEMPOTENCY
  // ==========================

  if (

    order.paymentStatus ===
    'paid'

  ) {

    return order;

  }

  // ==========================
  // UPDATE ORDER
  // ==========================

  order.paymentStatus =
    'paid';

  order.paymentDetails = {

    ...order.paymentDetails,

    razorpayPaymentId:
      razorpay_payment_id,

    razorpaySignature:
      razorpay_signature,

    paidAt:
      new Date()

  };

  await order.save();

  return order;

};