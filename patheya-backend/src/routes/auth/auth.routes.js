const express = require('express');

const router = express.Router();

const {

  register,

  login,

  registerOwner

} = require('../../controllers/auth/auth.controller');


// ==============================
// CUSTOMER REGISTER
// PUBLIC
// ==============================
router.post(

  '/register',

  register

);


// ==============================
// OWNER REGISTER
// PUBLIC
// ==============================
router.post(

  '/owner-register',

  (req, res, next) => {

    console.log(
      'HIT OWNER REGISTER ROUTE ✅'
    );

    next();

  },

  registerOwner

);


// ==============================
// LOGIN
// PUBLIC
// ==============================
router.post(

  '/login',

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