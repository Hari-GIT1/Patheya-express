const asyncHandler =
  require(
    '../../../core/utils/asyncHandler'
  );

const {

  successResponse

} = require(
  '../../../core/responses/response'
);

const adminService =
  require(
    '../services/admin.service'
  );

// =====================================================
// AUTH
// =====================================================

exports.login =
asyncHandler(async (

  req,

  res

) => {

  const data =
    await adminService
      .loginAdmin(

        req.body.email,

        req.body.password

      );

  successResponse(

    res,

    data,

    'Admin login successful'

  );

});

exports.register =
asyncHandler(async (

  req,

  res

) => {

  const admin =
    await adminService
      .registerAdmin(
        req.body
      );

  successResponse(

    res,

    admin,

    'Admin created successfully',

    201

  );

});

exports.getMe =
asyncHandler(async (

  req,

  res

) => {

  successResponse(

    res,

    req.admin,

    'Admin profile fetched'

  );

});

// =====================================================
// DASHBOARD
// =====================================================

exports.getDashboard =
asyncHandler(async (

  req,

  res

) => {

  const data =
    await adminService
      .getDashboardStats();

  successResponse(

    res,

    data,

    'Dashboard fetched'

  );

});

// =====================================================
// ORDERS
// =====================================================

exports.getOrders =
asyncHandler(async (

  req,

  res

) => {

  const orders =
    await adminService
      .getOrders(
        req.query
      );

  successResponse(

    res,

    orders,

    'Orders fetched'

  );

});

exports.getLiveOrders =
asyncHandler(async (

  req,

  res

) => {

  const orders =
    await adminService
      .getLiveOrders();

  successResponse(

    res,

    orders,

    'Live orders fetched'

  );

});

exports.updateOrderStatus =
asyncHandler(async (

  req,

  res

) => {

  const order =
    await adminService
      .updateOrderStatus(

        req.params.id,

        req.body.status

      );

  const socketService =
    req.app.get(
      'socketService'
    );

  if (socketService) {

    socketService
      .emitOrderStatusUpdate(
        order
      );

  }

  successResponse(

    res,

    order,

    'Order status updated'

  );

});

// =====================================================
// RESTAURANTS
// =====================================================

exports.getPendingRestaurants =
asyncHandler(async (

  req,

  res

) => {

  const restaurants =
    await adminService
      .getPendingRestaurants();

  successResponse(

    res,

    restaurants,

    'Pending restaurants fetched'

  );

});

exports.updateRestaurantStatus =
asyncHandler(async (

  req,

  res

) => {

  const restaurant =
    await adminService
      .updateRestaurantStatus(

        req.params.id,

        req.body.status,

        req.admin._id

      );

  successResponse(

    res,

    restaurant,

    `Restaurant ${req.body.status} successfully`

  );

});

// =====================================================
// USERS
// =====================================================

exports.getUsers =
asyncHandler(async (

  req,

  res

) => {

  const users =
    await adminService
      .getUsers(
        req.query
      );

  successResponse(

    res,

    users,

    'Users fetched'

  );

});

exports.toggleUserBlock =
asyncHandler(async (

  req,

  res

) => {

  const user =
    await adminService
      .toggleUserBlock(

        req.params.id

      );

  successResponse(

    res,

    user,

    user.isBlocked

      ? 'User blocked successfully'

      : 'User unblocked successfully'

  );

});