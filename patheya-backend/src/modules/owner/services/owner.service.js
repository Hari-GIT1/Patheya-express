const Restaurant =
  require(
    '../../restaurant/models/Restaurant'
  );

const ApiError =
  require(
    '../../../core/errors/ApiError'
  );

const cacheService =
  require(
    '../../../core/cache/cache.service'
  );

// ==============================
// GET SETTINGS
// ==============================

exports.getOwnerSettings =
async (

  restaurantId

) => {

  const cacheKey =
    `owner-settings:${restaurantId}`;

  // ==========================
  // CACHE
  // ==========================

  const cached =
    await cacheService.get(
      cacheKey
    );

  if (cached) {

    return cached;

  }

  // ==========================
  // FIND RESTAURANT
  // ==========================

  const restaurant =
    await Restaurant.findById(
      restaurantId
    );

  if (!restaurant) {

    throw new ApiError(

      404,

      'Restaurant not found'

    );

  }

  const settings = {

    restaurantName:
      restaurant.name || '',

    phone:
      restaurant.phone || '',

    email:
      restaurant.email || '',

    address:
      restaurant.address || '',

    deliveryTime:
      restaurant.deliveryTime || '',

    logo:
      restaurant.logo || '',

    isOpen:
      restaurant.isOpen ?? true,

    approvalStatus:
      restaurant.approvalStatus

  };

  // ==========================
  // STORE CACHE
  // ==========================

  await cacheService.set(

    cacheKey,

    settings,

    300

  );

  return settings;

};

// ==============================
// UPDATE SETTINGS
// ==============================

exports.updateOwnerSettings =
async (

  restaurantId,

  body

) => {

  // ==========================
  // FIND RESTAURANT
  // ==========================

  const restaurant =
    await Restaurant.findById(
      restaurantId
    );

  if (!restaurant) {

    throw new ApiError(

      404,

      'Restaurant not found'

    );

  }

  // ==========================
  // UPDATE
  // ==========================

  restaurant.name =
    body.restaurantName ??
    restaurant.name;

  restaurant.phone =
    body.phone ??
    restaurant.phone;

  restaurant.email =
    body.email ??
    restaurant.email;

  restaurant.address =
    body.address ??
    restaurant.address;

  restaurant.deliveryTime =
    body.deliveryTime ??
    restaurant.deliveryTime;

  restaurant.logo =
    body.logo ??
    restaurant.logo;

  if (

    typeof body.isOpen ===
    'boolean'

  ) {

    restaurant.isOpen =
      body.isOpen;

  }

  await restaurant.save();

  // ==========================
  // CLEAR CACHE
  // ==========================

  await cacheService.del(
    `owner-settings:${restaurantId}`
  );

  return restaurant;

};