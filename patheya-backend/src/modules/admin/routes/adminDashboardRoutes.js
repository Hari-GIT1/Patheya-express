const express = require('express');

const router = express.Router();

const adminDashboardController = require(
  '../controllers/adminDashboardController'
);

const adminAuthMiddleware = require(
  '../middleware/adminAuthMiddleware'
);

router.get(
  '/',
  adminAuthMiddleware,
  adminDashboardController.getDashboard
);

module.exports = router;