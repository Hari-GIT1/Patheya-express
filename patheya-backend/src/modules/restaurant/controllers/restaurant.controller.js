const asyncHandler =
  require(
    '../../../utils/asyncHandler'
  );

const {

  successResponse

} = require(
  '../../../utils/response'
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