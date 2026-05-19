const adminRestaurantService = require(
    '../services/adminRestaurantService'
  );
  
  const getPendingRestaurants = async (
    req,
    res
  ) => {
    try {
      const restaurants =
        await adminRestaurantService.getPendingRestaurants();
  
      res.status(200).json({
        success: true,
        data: restaurants,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  const updateRestaurantStatus = async (
    req,
    res
  ) => {
    try {
      const { id } = req.params;
  
      const { status } = req.body;
  
      const restaurant =
        await adminRestaurantService.updateRestaurantStatus(
          id,
          status,
          req.admin._id
        );
  
      res.status(200).json({
        success: true,
        message: `Restaurant ${status} successfully`,
        data: restaurant,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  module.exports = {
    getPendingRestaurants,
    updateRestaurantStatus,
  };