const Order = require('../../../models/Order');
const User = require('../../../models/User');
const Restaurant = require('../../../models/Restaurant');

const getDashboardStats = async () => {
  const totalOrders = await Order.countDocuments();

  const totalUsers = await User.countDocuments({
    role: 'customer',
  });

  const totalRestaurants =
    await Restaurant.countDocuments();

  const activeRestaurants =
    await Restaurant.countDocuments({
      isOpen: true,
    });

  const totalRevenueData = await Order.aggregate([
    {
      $match: {
        paymentStatus: 'paid',
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: '$total',
        },
      },
    },
  ]);

  const totalRevenue =
    totalRevenueData[0]?.totalRevenue || 0;

  return {
    totalOrders,
    totalUsers,
    totalRestaurants,
    activeRestaurants,
    totalRevenue,
  };
};

module.exports = {
  getDashboardStats,
};