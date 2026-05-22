const Order =
  require('../../../models/Order');

const eventBus =
  require(
    '../../../core/events/eventBus'
  );

const orderEvents =
  require(
    '../events/order.events'
  );

// ==============================
// ORDER EXPIRY PROCESSOR
// ==============================

module.exports =
async (job) => {

  try {

    const {

      orderId

    } = job.data;

    console.log(

      'PROCESSING ORDER EXPIRY:',

      orderId

    );

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

      console.log(
        'ORDER NOT FOUND'
      );

      return;

    }

    // ==========================
    // IDEMPOTENCY
    // ==========================

    if (

      order.paymentStatus ===
      'paid'

    ) {

      console.log(
        'ORDER ALREADY PAID'
      );

      return;

    }

    // ==========================
    // ALREADY CANCELLED
    // ==========================

    if (

      order.status ===
      'cancelled'

    ) {

      console.log(
        'ORDER ALREADY CANCELLED'
      );

      return;

    }

    // ==========================
    // CANCEL ORDER
    // ==========================

    order.status =
      'cancelled';

    order.paymentStatus =
      'failed';

    order.cancelledAt =
      new Date();

    order.statusTimeline.push({

      status:
        'cancelled',

      changedAt:
        new Date()

    });

    await order.save();

    console.log(

      'ORDER AUTO CANCELLED:',

      order._id

    );

    // ==========================
    // EVENTS
    // ==========================

    eventBus.emit(

      orderEvents.ORDER_STATUS_UPDATED,

      order

    );

  }

  catch (error) {

    console.log(error);

  }

};