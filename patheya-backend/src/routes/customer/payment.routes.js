const express = require('express');

const router = express.Router();

const auth =
require('../../modules/auth/middleware/auth.middleware')

const allowRoles =
require('../../modules/auth/middleware/role.middleware')

const {

  createPaymentOrder,

  verifyPayment

} = require('../../controllers/customer/payment.controller');


// ==============================
// CREATE PAYMENT ORDER
// CUSTOMER ONLY
// ==============================
router.post(

  '/create-order',

  auth,

  allowRoles('customer'),

  createPaymentOrder

);


// ==============================
// VERIFY PAYMENT
// CUSTOMER ONLY
// ==============================
router.post(

  '/verify-payment',

  auth,

  allowRoles('customer'),

  verifyPayment

);

module.exports = router;