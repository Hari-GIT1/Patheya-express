const Restaurant = require('../../../models/Restaurant');

const getPendingRestaurants = async () => {

  return await Restaurant.find({

    approvalStatus: {
      $in: [null, 'pending']
    }

  }).sort({

    createdAt: -1

  });

};


const updateRestaurantStatus = async (
  restaurantId,
  status,
  adminId
) => {
  const restaurant = await Restaurant.findById(
    restaurantId
  );

  if (!restaurant) {
    throw new Error('Restaurant not found');
  }

  restaurant.approvalStatus = status;

  if (status === 'approved') {
    restaurant.approvedBy = adminId;
    restaurant.approvedAt = new Date();
  }

  await restaurant.save();

  return restaurant;
};

module.exports = {
  getPendingRestaurants,
  updateRestaurantStatus,
};