const express =
  require('express');

const router =
  express.Router();

const authController =
  require(
    '../controllers/auth.controller'
  );

const authMiddleware =
  require(
  '../../../core/middleware/auth.middleware'
  );

  const allowRoles =
  require(
    '../../../core/middleware/role.middleware'
  );

// ==============================
// REGISTER
// ==============================

router.post(

  '/register',

  authController.register

);

router.get(
    '/test',
    (req, res) => {
  
      res.json({
        success: true,
        message: 'Delivery routes working'
      });
  
    }
  );

// ==============================
// LOGIN
// ==============================

router.post(

  '/login',

  authController.login

);

// ==============================
// PROFILE
// ==============================
router.get(

  '/profile',

  authMiddleware,

  allowRoles('delivery'),

  (req, res) => {

    res.json({

      success: true,

      data:
        req.deliveryPartner

    });

  }

);

module.exports =
  router;