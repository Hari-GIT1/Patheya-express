const express = require('express');

const router = express.Router();

const adminAuthController = require(
  '../controllers/adminAuthController'
);
const adminAuthMiddleware = require(
    '../middleware/adminAuthMiddleware'
  );

router.post('/login', adminAuthController.login);

router.get(
    '/me',
    adminAuthMiddleware,
    adminAuthController.getMe
  );
router.post(
    '/register',
    adminAuthController.register
  );

module.exports = router;