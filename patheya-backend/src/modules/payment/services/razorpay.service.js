const crypto =
  require('crypto');

const razorpay =
  require(
    '../../../config/razorpay'
  );

// ==============================
// CREATE ORDER
// ==============================

exports.createOrder =
async (options) => {

  return await razorpay
    .orders
    .create(options);

};

// ==============================
// VERIFY SIGNATURE
// ==============================

exports.verifySignature =
({

  razorpay_order_id,

  razorpay_payment_id,

  razorpay_signature

}) => {

  const generatedSignature =

    crypto

      .createHmac(

        'sha256',

        process.env
          .RAZORPAY_KEY_SECRET

      )

      .update(

        `${razorpay_order_id}|${razorpay_payment_id}`

      )

      .digest('hex');

  return (

    generatedSignature ===
    razorpay_signature

  );

};  