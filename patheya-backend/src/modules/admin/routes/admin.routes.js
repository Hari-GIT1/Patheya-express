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

const validate =
  require(
    '../../../core/middleware/validate.middleware'
  );

const adminController =
  require(
    '../controllers/admin.controller'
  );

const adminValidation =
  require(
    '../validations/admin.validation'
  );
const ADMIN_ROLES =
  require(
    '../constants/adminRoles'
  );

// =====================================================
// AUTH
// =====================================================

router.post(

  '/auth/login',

  adminValidation.login,

  validate,

  adminController.login

);

router.post(

  '/auth/register',

  auth,

  allowRoles(

  ADMIN_ROLES.ADMIN,

  ADMIN_ROLES.OPERATIONS_ADMIN,

  ADMIN_ROLES.SUPER_ADMIN

),

  adminValidation.register,

  validate,

  adminController.register

);

router.get(

  '/auth/me',

  auth,

  allowRoles(

  ADMIN_ROLES.ADMIN,

  ADMIN_ROLES.OPERATIONS_ADMIN,

  ADMIN_ROLES.SUPER_ADMIN

),

  adminController.getMe

);

// =====================================================
// DASHBOARD
// =====================================================

router.get(

  '/dashboard',

  auth,

  allowRoles(

  ADMIN_ROLES.ADMIN,

  ADMIN_ROLES.OPERATIONS_ADMIN,

  ADMIN_ROLES.SUPER_ADMIN

),

  adminController.getDashboard

);

// =====================================================
// ORDERS
// =====================================================

router.get(

  '/orders',

  auth,

  allowRoles(

  ADMIN_ROLES.ADMIN,

  ADMIN_ROLES.OPERATIONS_ADMIN,

  ADMIN_ROLES.SUPER_ADMIN

),

  adminController.getOrders

);

router.get(

  '/orders/live',

  auth,

  allowRoles(

  ADMIN_ROLES.ADMIN,

  ADMIN_ROLES.OPERATIONS_ADMIN,

  ADMIN_ROLES.SUPER_ADMIN

),

  adminController.getLiveOrders

);

router.patch(

  '/orders/:id/status',

  auth,

  allowRoles(

  ADMIN_ROLES.ADMIN,

  ADMIN_ROLES.OPERATIONS_ADMIN,

  ADMIN_ROLES.SUPER_ADMIN

),

  adminValidation.updateOrderStatus,

  validate,

  adminController.updateOrderStatus

);

// =====================================================
// RESTAURANTS
// =====================================================

router.get(

  '/restaurants/pending',

  auth,

  allowRoles(

  ADMIN_ROLES.ADMIN,

  ADMIN_ROLES.OPERATIONS_ADMIN,

  ADMIN_ROLES.SUPER_ADMIN

),

  adminController.getPendingRestaurants

);

router.patch(

  '/restaurants/:id/status',

  auth,

  allowRoles(

  ADMIN_ROLES.ADMIN,

  ADMIN_ROLES.OPERATIONS_ADMIN,

  ADMIN_ROLES.SUPER_ADMIN

),

  adminValidation.updateRestaurantStatus,

  validate,

  adminController.updateRestaurantStatus

);

// =====================================================
// USERS
// =====================================================

router.get(

  '/users',

  auth,

  allowRoles(

  ADMIN_ROLES.ADMIN,

  ADMIN_ROLES.OPERATIONS_ADMIN,

  ADMIN_ROLES.SUPER_ADMIN

),

  adminController.getUsers

);

router.patch(

  '/users/:id/toggle-block',

  auth,

  allowRoles(

  ADMIN_ROLES.ADMIN,

  ADMIN_ROLES.OPERATIONS_ADMIN,

  ADMIN_ROLES.SUPER_ADMIN

),

  adminController.toggleUserBlock

);

module.exports =
  router;