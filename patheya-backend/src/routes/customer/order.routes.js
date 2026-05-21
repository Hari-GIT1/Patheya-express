const express = require('express');

const router = express.Router();

const auth =
  require('../../middleware/auth.middleware');

const allowRoles =
  require('../../middleware/role.middleware');

const {

    placeOrderValidation
  
  } = require(
    '../../validations/order.validation'
  );
const validate =
  require(
    '../../middleware/validate.middleware'
  );

const {

  placeOrder,

  getPartnerOrders,

  getUserOrders,

  getRestaurantOrders,

  getOrderById,

  updateOrderStatus

} = require('../../controllers/customer/order.controller');


// ==============================
// PLACE ORDER
// CUSTOMER ONLY
// ==============================
router.post(

  '/',

  auth,

  placeOrderValidation,

  validate,

  placeOrder
);


// ==============================
// PARTNER ORDERS
// OWNER ONLY
// ==============================
router.get(

  '/partner',

  auth,

  allowRoles('owner'),

  getPartnerOrders

);


// ==============================
// CUSTOMER ORDERS
// CUSTOMER ONLY
// ==============================
router.get(

  '/user/:userId',

  auth,

  allowRoles('customer'),

  getUserOrders

);


// ==============================
// RESTAURANT ORDERS
// PUBLIC
// ==============================
router.get(

  '/restaurant/:restaurantId',

  getRestaurantOrders

);


// ==============================
// GET SINGLE ORDER
// AUTHENTICATED USERS
// ==============================
router.get(

  '/:id',

  auth,

  getOrderById

);


// ==============================
// PATCH STATUS
// OWNER ONLY
// ==============================
router.patch(

  '/:id/status',

  auth,

  allowRoles('owner'),

  updateOrderStatus

);


// ==============================
// KEEP PUT ROUTE
// OWNER ONLY
// ==============================
router.put(

  '/:id/status',

  auth,

  allowRoles('owner'),

  updateOrderStatus

);

module.exports = router;