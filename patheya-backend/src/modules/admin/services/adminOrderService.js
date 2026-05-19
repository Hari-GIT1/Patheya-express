const Order = require('../../../models/Order');

const getOrders = async (query) => {
  const filter = {};

  if (query.status) {
    filter.status = query.status;
  }

  if (query.paymentStatus) {
    filter.paymentStatus =
      query.paymentStatus;
  }

  return await Order.find(filter)
    .populate('userId', 'name email')
    .populate('restaurantId', 'name')
    .sort({ createdAt: -1 });
};

const getLiveOrders = async () => {
  return await Order.find({
    status: {
      $in: [
        'placed',
        'accepted',
        'preparing',
        'out_for_delivery',
      ],
    },
  })
    .populate('userId', 'name')
    .populate('restaurantId', 'name')
    .sort({ createdAt: -1 });
};

module.exports = {
  getOrders,
  getLiveOrders,
};