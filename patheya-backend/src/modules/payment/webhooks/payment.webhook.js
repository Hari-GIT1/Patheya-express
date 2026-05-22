const crypto =
  require('crypto');

const Order =
  require('../../../models/Order');

// ==============================
// RAZORPAY WEBHOOK
// ==============================

exports.handleWebhook =
async (

  req,

  res

) => {

  try {

    // ==========================
    // RAW BODY
    // ==========================

    const rawBody =
      req.body;

    // ==========================
    // SIGNATURE
    // ==========================

    const signature =

      req.headers[
        'x-razorpay-signature'
      ];

    // ==========================
    // VERIFY WEBHOOK SIGNATURE
    // ==========================

    const expectedSignature =

      crypto

        .createHmac(

          'sha256',

          process.env
            .RAZORPAY_WEBHOOK_SECRET

        )

        .update(rawBody)

        .digest('hex');

    // ==========================
    // INVALID SIGNATURE
    // ==========================

    if (

      signature !==
      expectedSignature

    ) {

      return res.status(400)
        .json({

          success: false,

          message:
            'Invalid webhook signature'

        });

    }

    // ==========================
    // PARSE BODY
    // ==========================

    const body =
      JSON.parse(
        rawBody.toString()
      );

    // ==========================
    // EVENT
    // ==========================

    const event =
      body.event;

    const paymentEntity =
      body
        ?.payload
        ?.payment
        ?.entity;

    // ==========================
    // SAFETY CHECK
    // ==========================

    if (!paymentEntity) {

      return res.status(400)
        .json({

          success: false,

          message:
            'Invalid webhook payload'

        });

    }

    // ==========================
    // PAYMENT CAPTURED
    // ==========================

    if (

      event ===
      'payment.captured'

    ) {

      const razorpayOrderId =

        paymentEntity.order_id;

      const razorpayPaymentId =

        paymentEntity.id;

      // ========================
      // FIND ORDER
      // ========================

      const order =
        await Order.findOne({

          'paymentDetails.razorpayOrderId':
            razorpayOrderId

        });

      // ========================
      // UPDATE ORDER
      // ========================

      if (order) {

        // ======================
        // IDEMPOTENCY
        // ======================

        if (

          order.paymentStatus !==
          'paid'

        ) {

          order.paymentStatus =
            'paid';

          order.paymentDetails = {

            ...order.paymentDetails,

            razorpayPaymentId,

            paidAt:
              new Date()

          };

          await order.save();

          console.log(

            'PAYMENT CAPTURED:',

            order._id

          );

        }

      }

    }

    // ==========================
    // PAYMENT FAILED
    // ==========================

    if (

      event ===
      'payment.failed'

    ) {

      const razorpayOrderId =

        paymentEntity.order_id;

      const order =
        await Order.findOne({

          'paymentDetails.razorpayOrderId':
            razorpayOrderId

        });

      if (order) {

        order.paymentStatus =
          'failed';

        order.paymentDetails = {

          ...order.paymentDetails,

          failedAt:
            new Date()

        };

        await order.save();

        console.log(

          'PAYMENT FAILED:',

          order._id

        );

      }

    }

    // ==========================
    // SUCCESS
    // ==========================

    return res.status(200)
      .json({

        success: true

      });

  }

  catch (error) {

    console.log(error);

    return res.status(500)
      .json({

        success: false,

        message:
          'Webhook failed'

      });

  }

};