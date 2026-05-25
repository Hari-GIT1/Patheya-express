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

const discountController =
  require(
    '../controllers/discount.controller'
  );

// ==============================
// CREATE DISCOUNT
// ==============================

router.post(

  '/',

  auth,

  allowRoles('owner'),

  discountController
    .createDiscount

);

// ==============================
// GET DISCOUNTS
// ==============================

router.get(

  '/',

  discountController
    .getDiscounts

);

module.exports =
  router;