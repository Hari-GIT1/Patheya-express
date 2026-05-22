const Restaurant =
  require('../../../models/Restaurant');

const APIFeatures =
  require(
    '../../../core/query/apiFeatures'
  );

const cacheService =
  require(
    '../../../core/cache/cache.service'
  );

// ==============================
// GET RESTAURANTS
// ==============================

exports.getRestaurants =
async (queryParams) => {

  // ==========================
  // CACHE KEY
  // ==========================

  const cacheKey =

    `restaurants:${JSON.stringify(
      queryParams
    )}`;

  // ==========================
  // CHECK CACHE
  // ==========================

  const cachedData =
    await cacheService.get(
      cacheKey
    );

  if (cachedData) {

    return cachedData;

  }

  // ==========================
  // BASE QUERY
  // ==========================

  const features =
    new APIFeatures(

      Restaurant.find({

        approvalStatus:
          'approved'

      }),

      queryParams

    )

    .filter()

    .sort()

    .limitFields()

    .paginate();

  // ==========================
  // EXECUTE
  // ==========================

  const restaurants =
    await features.query;

  // ==========================
  // STORE CACHE
  // ==========================

  await cacheService.set(

    cacheKey,

    restaurants,

    300

  );

  return restaurants;

};