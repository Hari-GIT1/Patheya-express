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

const {

  placeOrderValidation

} = require(
  '../validations/order.validation'
);

const validate =
  require(
    '../../../core/middleware/validate.middleware'
  );

const orderController =
  require(
    '../controllers/order.controller'
  );

// ==============================
// PLACE ORDER
// ==============================

router.post(

  '/',

  auth,

  allowRoles('customer'),

  placeOrderValidation,

  validate,

  orderController.placeOrder

);

// ==============================
// GET ALL ORDERS
// ==============================

router.get(

  '/',

  auth,

  orderController.getOrders

);

// ==============================
// PARTNER ORDERS
// ==============================

router.get(

  '/partner',

  auth,

  allowRoles('owner'),

  orderController.getPartnerOrders

);

// ==============================
// USER ORDERS
// ==============================

router.get(

  '/user/:userId',

  auth,

  allowRoles('customer'),

  orderController.getUserOrders

);

// ==============================
// GET SINGLE ORDER
// ==============================

router.get(

  '/:id',

  auth,

  orderController.getOrderById

);

// ==============================
// UPDATE STATUS
// ==============================

router.patch(

  '/:id/status',

  auth,

  allowRoles('owner'),

  orderController.updateOrderStatus

);

module.exports =
  router;