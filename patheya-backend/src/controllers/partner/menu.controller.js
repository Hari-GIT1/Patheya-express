const asyncHandler =
  require(
    '../../utils/asyncHandler'
  );

const {

  successResponse,

  errorResponse

} = require(
  '../../utils/response'
);

const menuService =
  require(
    '../../services/menu.service'
  );

// ==============================
// GET PARTNER MENU
// ==============================
exports.getPartnerMenu =
asyncHandler(async (

  req,

  res

) => {

  const items =
    await menuService
      .getPartnerMenu(

        req.user.restaurantId

      );

  successResponse(

    res,

    items,

    'Partner menu fetched'

  );

});

// ==============================
// GET CUSTOMER MENU
// ==============================
exports.getRestaurantMenu =
asyncHandler(async (

  req,

  res

) => {

  const items =
    await menuService
      .getRestaurantMenu(

        req.params.restaurantId

      );

  successResponse(

    res,

    items,

    'Restaurant menu fetched'

  );

});

// ==============================
// ADD MENU ITEM
// ==============================
exports.addMenuItem =
asyncHandler(async (

  req,

  res

) => {

  const item =
    await menuService
      .addMenuItem(

        req.user,

        req.body,

        req.file

      );

  successResponse(

    res,

    item,

    'Menu item added'

  );

});

// ==============================
// UPDATE MENU ITEM
// ==============================
exports.updateMenuItem =
asyncHandler(async (

  req,

  res

) => {

  const item =
    await menuService
      .updateMenuItem(

        req.params.id,

        req.body,

        req.file

      );

  successResponse(

    res,

    item,

    'Menu item updated'

  );

});

// ==============================
// DELETE MENU ITEM
// ==============================
exports.deleteMenuItem =
asyncHandler(async (

  req,

  res

) => {

  await menuService
    .deleteMenuItem(

      req.params.id

    );

  successResponse(

    res,

    null,

    'Menu item deleted'

  );

});

// ==============================
// UPDATE AVAILABILITY
// ==============================
exports.updateAvailability =
asyncHandler(async (

  req,

  res

) => {

  const item =
    await menuService
      .updateAvailability(

        req.params.id,

        req.body.isAvailable

      );

  successResponse(

    res,

    item,

    'Availability updated'

  );

});