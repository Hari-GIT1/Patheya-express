const express = require('express');

const router = express.Router();

const adminRestaurantController = require(
  '../controllers/adminRestaurantController'
);

const adminAuthMiddleware = require(
  '../middleware/adminAuthMiddleware'
);

router.get(
  '/pending',
  adminAuthMiddleware,
  adminRestaurantController.getPendingRestaurants
);

router.patch(
  '/:id/status',
  adminAuthMiddleware,
  adminRestaurantController.updateRestaurantStatus
);

module.exports = router;