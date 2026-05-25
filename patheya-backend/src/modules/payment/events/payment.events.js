const crypto =
  require('crypto');

const Order =
  require('../../order/models/Order');

const eventBus =
  require(
    '../../../core/events/eventBus'
  );

const paymentEvents =
  require(
    '../events/payment.events'
  );

// ==============================
// HANDLE RAZORPAY WEBHOOK
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

    const razorpaySignature =

      req.headers[
        'x-razorpay-signature'
      ];

    // ==========================
    // VERIFY SIGNATURE
    // ==========================

    const expectedSignature =

      crypto

        .createHmac(

          'sha256',

          process.env
            .RAZORPAY_WEBHOOK_SECRET

        )

        .update(

          rawBody.toString(),

          'utf8'

        )

        .digest('hex');

    // ==========================
    // INVALID SIGNATURE
    // ==========================

    if (

      razorpaySignature !==
      expectedSignature

    ) {

      console.log(
        'INVALID WEBHOOK SIGNATURE'
      );

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
    // EVENT TYPE
    // ==========================

    const event =
      body.event;

    // ==========================
    // PAYMENT ENTITY
    // ==========================

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
    // COMMON VALUES
    // ==========================

    const razorpayOrderId =

      paymentEntity.order_id;

    const razorpayPaymentId =

      paymentEntity.id;

    // ==========================
    // FIND ORDER
    // ==========================

    const order =
      await Order.findOne({

        'paymentDetails.razorpayOrderId':
          razorpayOrderId

      });

    // ==========================
    // ORDER NOT FOUND
    // ==========================

    if (!order) {

      console.log(
        'WEBHOOK ORDER NOT FOUND'
      );

      return res.status(200)
        .json({

          success: true

        });

    }

    // ==========================
    // PAYMENT CAPTURED
    // ==========================

    if (

      event ===
      'payment.captured'

    ) {

      // ========================
      // IDEMPOTENCY
      // ========================

      if (

        order.paymentDetails
          ?.razorpayPaymentId

      ) {

        console.log(
          'PAYMENT ALREADY PROCESSED'
        );

        return res.status(200)
          .json({

            success: true

          });

      }

      // ========================
      // UPDATE ORDER
      // ========================

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

      // ========================
      // EVENTS
      // ========================

      eventBus.emit(

        paymentEvents
          .PAYMENT_SUCCESS,

        order

      );

    }

    // ==========================
    // PAYMENT FAILED
    // ==========================

    if (

      event ===
      'payment.failed'

    ) {

      // ========================
      // AVOID OVERRIDING PAID
      // ========================

      if (

        order.paymentStatus !==
        'paid'

      ) {

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

        // ======================
        // EVENTS
        // ======================

        eventBus.emit(

          paymentEvents
            .PAYMENT_FAILED,

          order

        );

      }

    }

    // ==========================
    // SUCCESS RESPONSE
    // ==========================

    return res.status(200)
      .json({

        success: true

      });

  }

  catch (error) {

    console.log(

      'WEBHOOK ERROR:',

      error

    );

    return res.status(500)
      .json({

        success: false,

        message:
          'Webhook processing failed'

      });

  }

};