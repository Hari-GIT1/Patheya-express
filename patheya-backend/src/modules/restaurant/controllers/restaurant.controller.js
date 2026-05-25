const asyncHandler =
  require(
    '../../../core/utils/asyncHandler'
  );

const {

  successResponse

} = require(
  '../../../core/responses/response'
);

const restaurantService =
  require(
    '../services/restaurant.service'
  );

// ==============================
// GET RESTAURANTS
// ==============================

exports.getRestaurants =
asyncHandler(async (

  req,

  res

) => {

  const restaurants =
    await restaurantService
      .getRestaurants(

        req.query

      );

  successResponse(

    res,

    restaurants,

    'Restaurants fetched'

  );

});