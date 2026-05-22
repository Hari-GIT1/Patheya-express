const eventBus =
  require(
    '../../../core/events/eventBus'
  );

const orderEvents =
  require(
    './order.events'
  );

const queueService =
  require(
    '../../../core/queue/queue.service'
  );

const orderExpiryProcessor =
  require(
    '../jobs/order-expiry.processor'
  );

// ==============================
// REGISTER QUEUE PROCESSOR
// ==============================

queueService.process(

  'order-expiry',

  orderExpiryProcessor

);

// ==============================
// ORDER CREATED
// ==============================

eventBus.on(

  orderEvents.ORDER_CREATED,

  async (order) => {

    try {

      console.log(

        'EVENT: ORDER_CREATED'

      );

      // ========================
      // CREATE EXPIRY JOB
      // ========================

      await queueService.addJob(

        'order-expiry',

        {

          orderId:
            order._id.toString()

        },

        {

          delay:
            10 * 60 * 1000 // 10 mins

        }

      );

      console.log(

        'ORDER EXPIRY JOB ADDED:',

        order._id

      );

    }

    catch (error) {

      console.log(error);

    }

  }

);

// ==============================
// ORDER STATUS UPDATED
// ==============================

eventBus.on(

  orderEvents.ORDER_STATUS_UPDATED,

  async (order) => {

    console.log(

      'EVENT: ORDER_STATUS_UPDATED',

      order.status

    );

  }

);

// ==============================
// ORDER DELIVERED
// ==============================

eventBus.on(

  orderEvents.ORDER_DELIVERED,

  async (order) => {

    console.log(

      'EVENT: ORDER_DELIVERED',

      order._id

    );

  }

);