const express = require('express');

const router = express.Router();

const auth =
require('../../modules/auth/middleware/auth.middleware')

const allowRoles =
require('../../modules/auth/middleware/role.middleware')

const {

  createDiscount,

  getDiscounts

} = require('../../controllers/customer/discount.controller');


// ==============================
// CREATE DISCOUNT
// OWNER ONLY
// ==============================
router.post(

  '/',

  auth,

  allowRoles('owner'),

  createDiscount

);


// ==============================
// GET DISCOUNTS
// PUBLIC
// ==============================
router.get(

  '/',

  getDiscounts

);

module.exports = router;