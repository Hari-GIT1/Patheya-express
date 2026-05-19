const asyncHandler =
  require(
    '../../utils/asyncHandler'
  );

const {

  successResponse

} = require(
  '../../utils/response'
);

const ownerService =
  require(
    '../../services/owner.service'
  );

// ==============================
// REGISTER OWNER
// ==============================
exports.registerOwner =
asyncHandler(async (

  req,

  res

) => {

  const result =
    await ownerService
      .registerOwner(

        req.body

      );

  successResponse(

    res,

    result,

    'Owner registered successfully'

  );

});

// ==============================
// OWNER LOGIN
// ==============================
exports.loginOwner =
asyncHandler(async (

  req,

  res

) => {

  const result =
    await ownerService
      .loginOwner(

        req.body.email,

        req.body.password

      );

  successResponse(

    res,

    result,

    'Owner login successful'

  );

});

// ==============================
// GET OWNER MENU
// ==============================
exports.getOwnerMenu =
asyncHandler(async (

  req,

  res

) => {

  const items =
    await ownerService
      .getOwnerMenu(

        req.user.restaurantId

      );

  successResponse(

    res,

    items,

    'Owner menu fetched'

  );

});

// ==============================
// ADD MENU ITEM
// ==============================
exports.addOwnerMenuItem =
asyncHandler(async (

  req,

  res

) => {

  const item =
    await ownerService
      .addOwnerMenuItem(

        req.body,

        req.user.restaurantId

      );

  successResponse(

    res,

    item,

    'Menu item added'

  );

});

// ==============================
// DELETE MENU ITEM
// ==============================
exports.deleteOwnerMenuItem =
asyncHandler(async (

  req,

  res

) => {

  await ownerService
    .deleteOwnerMenuItem(

      req.params.id

    );

  successResponse(

    res,

    null,

    'Menu item deleted'

  );

});

// ==============================
// GET OWNER ORDERS
// ==============================
exports.getOwnerOrders =
asyncHandler(async (

  req,

  res

) => {

  const orders =
    await ownerService
      .getOwnerOrders(

        req.user.restaurantId

      );

  successResponse(

    res,

    orders,

    'Owner orders fetched'

  );

});

// ==============================
// GET SETTINGS
// ==============================
exports.getOwnerSettings =
asyncHandler(async (

  req,

  res

) => {

  const settings =
    await ownerService
      .getOwnerSettings(

        req.user.restaurantId

      );

  successResponse(

    res,

    settings,

    'Settings fetched'

  );

});

// ==============================
// UPDATE SETTINGS
// ==============================
exports.updateOwnerSettings =
asyncHandler(async (

  req,

  res

) => {

  const updatedSettings =
    await ownerService
      .updateOwnerSettings(

        req.user.restaurantId,

        req.body

      );

  successResponse(

    res,

    updatedSettings,

    'Settings updated'

  );

});