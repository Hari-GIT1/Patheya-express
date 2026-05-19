const Order =
  require('../models/Order');

exports.createOrder =
async (

  userId,

  orderData

) => {

  const order =
    await Order.create({

      userId,

      restaurantId:
        orderData.restaurantId,

      items:
        orderData.items,

      total:
        orderData.total,

      status: 'placed'

    });

  return order;

};

exports.getPartnerOrders =
async (restaurantId) => {

  return await Order.find({

    restaurantId

  }).sort({

    createdAt: -1

  });

};

exports.getUserOrders =
async (userId) => {

  return await Order.find({

    userId

  }).sort({

    createdAt: -1

  });

};