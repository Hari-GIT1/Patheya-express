const express = require('express');

const router = express.Router();

const multer = require('multer');

const auth =
  require('../../middleware/auth.middleware');

const allowRoles =
  require('../../middleware/role.middleware');

const {

  getPartnerMenu,

  getRestaurantMenu,

  addMenuItem,

  updateMenuItem,

  deleteMenuItem,

  updateAvailability

} = require('../../controllers/partner/menu.controller');


// MULTER STORAGE
const storage = multer.diskStorage({

  destination: 'uploads/',

  filename: (req, file, cb) => {

    cb(

      null,

      Date.now() +
      '-' +
      file.originalname

    );

  }

});

const upload = multer({ storage });


// ==============================
// PARTNER MENU
// OWNER ONLY
// ==============================
router.get(

  '/',

  auth,

  allowRoles('owner'),

  getPartnerMenu

);


// ==============================
// CUSTOMER MENU
// PUBLIC
// ==============================
router.get(

  '/:restaurantId',

  getRestaurantMenu

);


// ==============================
// ADD ITEM
// OWNER ONLY
// ==============================
router.post(

  '/',

  auth,

  allowRoles('owner'),

  upload.single('image'),

  addMenuItem

);


// ==============================
// UPDATE ITEM
// OWNER ONLY
// ==============================
router.put(

  '/:id',

  auth,

  allowRoles('owner'),

  upload.single('image'),

  updateMenuItem

);


// ==============================
// DELETE ITEM
// OWNER ONLY
// ==============================
router.delete(

  '/:id',

  auth,

  allowRoles('owner'),

  deleteMenuItem

);


// ==============================
// UPDATE AVAILABILITY
// OWNER ONLY
// ==============================
router.patch(

  '/:id/availability',

  auth,

  allowRoles('owner'),

  updateAvailability

);

module.exports = router;