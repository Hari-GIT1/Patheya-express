const express =
  require('express');

const router =
  express.Router();

const upload =
  require(
    '../../../middleware/upload.middleware'
  );

const auth =
  require(
    '../../auth/middleware/auth.middleware'
  );

const allowRoles =
  require(
    '../../auth/middleware/role.middleware'
  );

const menuController =
  require(
    '../controllers/menu.controller'
  );

// ==============================
// GET ALL MENU ITEMS
// ==============================

router.get(

  '/',

  menuController.getMenuItems

);

// ==============================
// GET RESTAURANT MENU
// ==============================

router.get(

  '/:restaurantId',

  menuController.getRestaurantMenu

);

// ==============================
// ADD MENU ITEM
// ==============================

router.post(

  '/',

  auth,

  allowRoles('owner'),

  upload.single('image'),

  menuController.addMenuItem

);

// ==============================
// UPDATE MENU ITEM
// ==============================

router.put(

  '/:id',

  auth,

  allowRoles('owner'),

  upload.single('image'),

  menuController.updateMenuItem

);

// ==============================
// DELETE MENU ITEM
// ==============================

router.delete(

  '/:id',

  auth,

  allowRoles('owner'),

  menuController.deleteMenuItem

);

// ==============================
// UPDATE AVAILABILITY
// ==============================

router.patch(

  '/:id/availability',

  auth,

  allowRoles('owner'),

  menuController.updateAvailability

);

module.exports =
  router;