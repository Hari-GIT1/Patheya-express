const express = require('express');

const router = express.Router();

const auth =
  require('../../middleware/auth.middleware');

const allowRoles =
  require('../../middleware/role.middleware');

const {

  registerOwner,

  loginOwner,

  getOwnerMenu,

  addOwnerMenuItem,

  deleteOwnerMenuItem,

  getOwnerOrders,

  getOwnerSettings,

  updateOwnerSettings

} = require('../../controllers/partner/owner.controller');


// ==============================
// REGISTER
// PUBLIC
// ==============================
router.post(

  '/register',

  registerOwner

);


// ==============================
// LOGIN
// PUBLIC
// ==============================
router.post(

  '/login',

  loginOwner

);


// ==============================
// GET MENU
// OWNER ONLY
// ==============================
router.get(

  '/menu',

  auth,

  allowRoles('owner'),

  getOwnerMenu

);


// ==============================
// ADD MENU ITEM
// OWNER ONLY
// ==============================
router.post(

  '/menu',

  auth,

  allowRoles('owner'),

  addOwnerMenuItem

);


// ==============================
// DELETE MENU ITEM
// OWNER ONLY
// ==============================
router.delete(

  '/menu/:id',

  auth,

  allowRoles('owner'),

  deleteOwnerMenuItem

);


// ==============================
// GET ORDERS
// OWNER ONLY
// ==============================
router.get(

  '/orders',

  auth,

  allowRoles('owner'),

  getOwnerOrders

);


// ==============================
// GET SETTINGS
// OWNER ONLY
// ==============================
router.get(

  '/settings',

  auth,

  allowRoles('owner'),

  getOwnerSettings

);


// ==============================
// UPDATE SETTINGS
// OWNER ONLY
// ==============================
router.put(

  '/settings',

  auth,

  allowRoles('owner'),

  updateOwnerSettings

);

module.exports = router;