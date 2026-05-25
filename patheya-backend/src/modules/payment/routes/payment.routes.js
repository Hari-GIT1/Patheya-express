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

const paymentController =
  require(
    '../controllers/payment.controller'
  );

const paymentWebhook =
  require(
    '../webhooks/payment.webhook'
  );

// ==============================
// WEBHOOK
// ==============================

router.post(

  '/webhook',

  paymentWebhook
    .handleWebhook

);

// ==============================
// CREATE PAYMENT ORDER
// ==============================

router.post(

  '/create-payment-order/:orderId',

  auth,

  allowRoles('customer'),

  paymentController
    .createPaymentOrder

);

// ==============================
// VERIFY PAYMENT
// ==============================

router.post(

  '/verify-payment',

  auth,

  allowRoles('customer'),

  paymentController
    .verifyPayment

);

module.exports =
  router;