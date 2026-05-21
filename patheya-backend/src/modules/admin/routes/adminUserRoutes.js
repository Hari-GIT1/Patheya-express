const express = require('express');

const router = express.Router();

const adminUserController = require(
  '../controllers/adminUserController'
);

const adminAuthMiddleware = require(
  '../middleware/adminAuthMiddleware'
);

router.get(
  '/',
  adminAuthMiddleware,
  adminUserController.getUsers
);

router.patch(
  '/:id/toggle-block',
  adminAuthMiddleware,
  adminUserController.toggleUserBlock
);

module.exports = router;