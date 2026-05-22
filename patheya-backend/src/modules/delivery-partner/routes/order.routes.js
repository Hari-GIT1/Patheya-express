const express =
  require('express');

const router =
  express.Router();

const orderController =
  require(
    '../controllers/order.controller'
  );

const authMiddleware =
  require(
  '../../auth/middleware/auth.middleware'
  );

// ==============================
// AVAILABLE ORDERS
// ==============================

router.get(

  '/available',

  authMiddleware,

  orderController.getAvailableOrders

);

// ==============================
// MY ORDERS
// ==============================

router.get(

  '/my-orders',

  authMiddleware,

  orderController.getMyOrders

);

// ==============================
// ACCEPT DELIVERY
// ==============================

router.patch(

  '/:id/accept',

  authMiddleware,

  orderController.acceptDelivery

);

// ==============================
// MARK DELIVERED
// ==============================

router.patch(

  '/:id/delivered',

  authMiddleware,

  orderController.markDelivered

);

module.exports =
  router;