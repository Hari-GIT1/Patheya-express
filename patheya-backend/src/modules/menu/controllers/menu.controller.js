const asyncHandler =
  require(
    '../../../core/utils/asyncHandler'
  );

const {
  successResponse
} = require(
  '../../../core/responses/response'
);

const menuService =
  require(
    '../services/menu.service'
  );

// ==============================
// GET ALL MENU ITEMS
// ==============================

exports.getMenuItems =
asyncHandler(async (

  req,

  res

) => {

  const menuItems =
    await menuService
      .getMenuItems(
        req.query
      );

  successResponse(

    res,

    menuItems,

    'Menu items fetched'

  );

});

// ==============================
// GET RESTAURANT MENU
// ==============================

exports.getRestaurantMenu =
asyncHandler(async (

  req,

  res

) => {

  const menuItems =
    await menuService
      .getMenuItems({

        restaurantId:
          req.params.restaurantId,

        isAvailable: true

      });

  successResponse(

    res,

    menuItems,

    'Restaurant menu fetched'

  );

});

// ==============================
// GET PARTNER MENU
// ==============================

exports.getPartnerMenu =
asyncHandler(async (

  req,

  res

) => {

  const menuItems =
    await menuService
      .getMenuItems({

        restaurantId:
          req.user.restaurantId

      });

  successResponse(

    res,

    menuItems,

    'Partner menu fetched'

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

        req.user,

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

      req.user,

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

        req.user,

        req.params.id,

        req.body.isAvailable

      );

  successResponse(

    res,

    item,

    'Availability updated'

  );

});