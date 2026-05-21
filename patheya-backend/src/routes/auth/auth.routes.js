const express = require('express');

const router = express.Router();

const {

  registerValidation,

  loginValidation,

  ownerRegisterValidation

} = require(
  '../../validations/auth.validation'
);

const {

  register,

  login,

  registerOwner

} = require('../../controllers/auth/auth.controller');

const validate =
  require(
    '../../middleware/validate.middleware'
  );


// ==============================
// CUSTOMER REGISTER
// PUBLIC
// ==============================
router.post(

  '/register',

  registerValidation,

  validate,

  register

);


// ==============================
// OWNER REGISTER
// PUBLIC
// ==============================
router.post(

  '/owner-register',

  ownerRegisterValidation,

  validate,

  registerOwner

);


// ==============================
// LOGIN
// PUBLIC
// ==============================
router.post(

  '/login',

  loginValidation,

  validate,

  login

);


// ==============================
// TEST
// ==============================
router.get(

  '/test',

  (req, res) => {

    res.send('Auth working');

  }

);

module.exports = router;