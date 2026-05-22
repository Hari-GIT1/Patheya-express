const express = require('express');
const restaurantController =
  require(
    '../../modules/restaurant/controllers/restaurant.controller'
  );

const router = express.Router();



// GET ALL RESTAURANTS
router.get('/', restaurantController.getRestaurants);

module.exports = router;