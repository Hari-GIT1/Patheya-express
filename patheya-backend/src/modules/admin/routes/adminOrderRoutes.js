const express = require('express');

const router = express.Router();

const adminOrderController = require(
  '../controllers/adminOrderController'
);

const adminAuthMiddleware = require(
  '../middleware/adminAuthMiddleware'
);

router.get(
  '/',
  adminAuthMiddleware,
  adminOrderController.getOrders
);

router.get(
  '/live',
  adminAuthMiddleware,
  adminOrderController.getLiveOrders
);
router.patch(
    '/:id/status',
    adminAuthMiddleware,
    adminOrderController.updateOrderStatus
  );

module.exports = router;