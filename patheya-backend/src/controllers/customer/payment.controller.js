const crypto = require('crypto');

const razorpay =
  require('../../config/razorpay');


// CREATE ORDER
exports.createPaymentOrder = async (req, res) => {

  try {

    const { amount } = req.body;

    const options = {

      amount: amount * 100,

      currency: 'INR',

      receipt:
        `receipt_${Date.now()}`

    };

    const order =
      await razorpay.orders.create(
        options
      );

    res.json(order);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message
    });

  }

};


// VERIFY PAYMENT
exports.verifyPayment = async (req, res) => {

  try {

    const {

      razorpay_order_id,

      razorpay_payment_id,

      razorpay_signature

    } = req.body;

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

    const isAuthentic =
      expectedSignature ===
      razorpay_signature;

    if (isAuthentic) {

      return res.json({
        success: true
      });

    }

    res.status(400).json({
      success: false
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};