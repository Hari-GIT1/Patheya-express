const crypto =
  require('crypto');

const razorpay =
  require('../config/razorpay');

// ==============================
// CREATE PAYMENT ORDER
// ==============================
exports.createPaymentOrder =
async (

  amount

) => {

  const options = {

    amount:
      amount * 100,

    currency: 'INR',

    receipt:
      `receipt_${Date.now()}`

  };

  const order =
    await razorpay.orders.create(
      options
    );

  return order;

};

// ==============================
// VERIFY PAYMENT
// ==============================
exports.verifyPayment =
async (

  paymentData

) => {

  const {

    razorpay_order_id,

    razorpay_payment_id,

    razorpay_signature

  } = paymentData;

  const body =

    razorpay_order_id +

    "|" +

    razorpay_payment_id;

  const expectedSignature =

    crypto

      .createHmac(

        'sha256',

        process.env
          .RAZORPAY_KEY_SECRET

      )

      .update(body.toString())

      .digest('hex');

  return (

    expectedSignature ===

    razorpay_signature

  );

};