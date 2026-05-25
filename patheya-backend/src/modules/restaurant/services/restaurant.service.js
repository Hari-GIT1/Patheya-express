const Restaurant =
  require(
    '../../restaurant/models/Restaurant'
  );

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
async (queryParams = {}) => {

  // ==========================
  // CACHE KEY
  // ==========================

  const cacheKey =

    `restaurants:${JSON.stringify(
      queryParams
    )}`;

  // ==========================
  // CACHE
  // ==========================

  const cachedData =
    await cacheService.get(
      cacheKey
    );

  if (cachedData) {

    return cachedData;

  }

  // ==========================
  // FILTERS
  // ==========================

  const filters = {

    approvalStatus:
      'approved',
  
    isOpen: true
  
  };
  // ==========================
  // SEARCH
  // ==========================

  if (

    queryParams.search

  ) {

    filters.name = {

      $regex:
        queryParams.search,

      $options: 'i'

    };

  }

  // ==========================
  // BASE QUERY
  // ==========================

  const features =
    new APIFeatures(

      Restaurant.find(filters),

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
  // CACHE STORE
  // ==========================

  await cacheService.set(

    cacheKey,

    restaurants,

    300

  );

  return restaurants;

};