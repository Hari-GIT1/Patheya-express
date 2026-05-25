const express =
  require('express');

const router =
  express.Router();

const auth =
  require(
    '../../../core/middleware/auth.middleware'
  );

const allowRoles =
  require(
    '../../../core/middleware/role.middleware'
  );

const orderController =
  require(
    '../controllers/order.controller'
  );

// ==============================
// AVAILABLE ORDERS
// ==============================

router.get(

  '/available',

  auth,

  allowRoles('delivery'),

  orderController
    .getAvailableOrders

);

// ==============================
// MY ORDERS
// ==============================

router.get(

  '/my-orders',

  auth,

  allowRoles('delivery'),

  orderController
    .getMyOrders

);

// ==============================
// ACCEPT DELIVERY
// ==============================

router.patch(

  '/:id/accept',

  auth,

  allowRoles('delivery'),

  orderController
    .acceptDelivery

);

// ==============================
// MARK DELIVERED
// ==============================

router.patch(

  '/:id/delivered',

  auth,

  allowRoles('delivery'),

  orderController
    .markDelivered

);

module.exports =
  router;