const orderQueue =
  require(
    '../queues/order.queue'
  );

exports.orderCreatedJob =
async (order) => {

  await orderQueue.add(

    'order-created',

    {

      orderId:
        order._id,

      order

    }

  );

};

exports.orderDeliveredJob =
async (order) => {

  await orderQueue.add(

    'order-delivered',

    {

      orderId:
        order._id,

      order

    }

  );

};