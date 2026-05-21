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
const crypto = require('crypto');

exports.verifyPayment = async (
  req,
  res
) => {

  try {

    const {

      razorpay_order_id,

      razorpay_payment_id,

      razorpay_signature

    } = req.body;

    // ==============================
    // GENERATE SIGNATURE
    // ==============================
    const generatedSignature =

      crypto
        .createHmac(

          'sha256',

          process.env
            .RAZORPAY_KEY_SECRET

        )

        .update(

          razorpay_order_id
          +
          '|'
          +
          razorpay_payment_id

        )

        .digest('hex');

    // ==============================
    // VERIFY
    // ==============================
    if (

      generatedSignature !==
      razorpay_signature

    ) {

      return res.status(400)
        .json({

          success: false,

          message:
            'Invalid payment signature'

        });

    }

    return res.json({

      success: true,

      message:
        'Payment verified'

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,

      message:
        'Payment verification failed'

    });

  }

};