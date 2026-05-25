const express =
  require('express');

const router =
  express.Router();

const auth =
  require(
    '../../../core/middleware/auth.middleware'
  );

const allowRoles =
  require(
    '../../../core/middleware/role.middleware'
  );

const ownerController =
  require(
    '../controllers/owner.controller'
  );

// ==============================
// GET SETTINGS
// ==============================

router.get(

  '/settings',

  auth,

  allowRoles('owner'),

  ownerController
    .getOwnerSettings

);

// ==============================
// UPDATE SETTINGS
// ==============================

router.put(

  '/settings',

  auth,

  allowRoles('owner'),

  ownerController
    .updateOwnerSettings

);

module.exports =
  router;