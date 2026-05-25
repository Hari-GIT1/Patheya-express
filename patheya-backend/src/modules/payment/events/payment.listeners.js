const eventBus =
  require(
    '../../../core/events/eventBus'
  );

const paymentEvents =
  require(
    './payment.events'
  );

// ==============================
// PAYMENT SUCCESS
// ==============================

eventBus.on(

  paymentEvents
    .PAYMENT_SUCCESS,

  async (order) => {

    console.log(

      'EVENT: PAYMENT_SUCCESS',

      order._id

    );

    // ==========================
    // SOCKET EVENT
    // ==========================

    const io =
      global.io;

    if (io) {

      io.to(
        order.restaurantId
          .toString()
      ).emit(

        'paymentSuccess',

        order

      );

    }

  }

);

// ==============================
// PAYMENT FAILED
// ==============================

eventBus.on(

  paymentEvents
    .PAYMENT_FAILED,

  async (order) => {

    console.log(

      'EVENT: PAYMENT_FAILED',

      order._id

    );

    // ==========================
    // SOCKET EVENT
    // ==========================

    const io =
      global.io;

    if (io) {

      io.to(
        order.restaurantId
          .toString()
      ).emit(

        'paymentFailed',

        order

      );

    }

  }

);