const express =
  require('express');

const router =
  express.Router();

const {

  registerValidation,

  loginValidation,

  ownerRegisterValidation

} = require(
  '../validations/auth.validation'
);

const validate =
  require(
    '../../../core/middleware/validate.middleware'
  );

const authController =
  require(
    '../controllers/auth.controller'
  );

// ==============================
// CUSTOMER REGISTER
// ==============================

router.post(

  '/register',

  registerValidation,

  validate,

  authController.register

);

// ==============================
// OWNER REGISTER
// ==============================

router.post(

  '/owner-register',

  ownerRegisterValidation,

  validate,

  authController.registerOwner

);

// ==============================
// LOGIN
// ==============================

router.post(

  '/login',

  loginValidation,

  validate,

  authController.login

);

// ==============================
// TEST
// ==============================

router.get(

  '/test',

  (req, res) => {

    res.send(
      'Auth working'
    );

  }

);

module.exports =
  router;