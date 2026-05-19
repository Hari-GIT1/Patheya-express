const express = require('express');

const router = express.Router();

const {

  getRestaurants

} = require('../../controllers/customer/restaurant.controller');


// GET ALL RESTAURANTS
router.get('/', getRestaurants);

module.exports = router;