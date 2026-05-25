const asyncHandler =
  require(
    '../../../core/utils/asyncHandler'
  );

const {

  successResponse

} = require(
  '../../../core/responses/response'
);

const ownerService =
  require(
    '../services/owner.service'
  );

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

  const updated =
    await ownerService
      .updateOwnerSettings(

        req.user.restaurantId,

        req.body

      );

  successResponse(

    res,

    updated,

    'Settings updated'

  );

});