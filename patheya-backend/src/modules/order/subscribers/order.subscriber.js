const eventBus =
  require(
    '../../../core/events/eventBus'
  );

const orderEvents =
  require(
    '../events/order.events'
  );

const notificationService =
  require(
    '../../notification/services/notification.service'
  );

// ==============================
// ORDER CREATED
// ==============================

eventBus.on(

  orderEvents.ORDER_CREATED,

  async (order) => {

    console.log(

      'EVENT:',
      'ORDER_CREATED'

    );

    await notificationService
      .orderCreated(order);

  }

);

// ==============================
// ORDER STATUS UPDATED
// ==============================

eventBus.on(

  orderEvents.ORDER_STATUS_UPDATED,

  async (order) => {

    console.log(

      'EVENT:',
      'ORDER_STATUS_UPDATED'

    );

    await notificationService
      .orderStatusUpdated(order);

  }

);

// ==============================
// ORDER DELIVERED
// ==============================

eventBus.on(

  orderEvents.ORDER_DELIVERED,

  async (order) => {

    console.log(

      'EVENT:',
      'ORDER_DELIVERED'

    );

    await notificationService
      .orderDelivered(order);

  }

);