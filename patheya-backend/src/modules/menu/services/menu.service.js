const MenuItem =
  require(
    '../../menu/models/MenuItem'
  );

const APIFeatures =
  require(
    '../../../core/query/apiFeatures'
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
// GET MENU ITEMS
// ==============================

exports.getMenuItems =
async (queryParams = {}) => {

  const cacheKey =
    `menu:${JSON.stringify(
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

  const filters = {};

  // RESTAURANT

  if (

    queryParams.restaurantId

  ) {

    filters.restaurantId =
      queryParams.restaurantId;

  }

  // CATEGORY

  if (

    queryParams.category

  ) {

    filters.category =
      queryParams.category;

  }

  // AVAILABILITY

  if (

    queryParams.isAvailable !==
    undefined

  ) {

    filters.isAvailable =

      queryParams.isAvailable ===
      true ||

      queryParams.isAvailable ===
      'true';

  }

  // SEARCH

  if (

    queryParams.search

  ) {

    filters.name = {

      $regex:
        queryParams.search,

      $options:
        'i'

    };

  }

  // ==========================
  // QUERY FEATURES
  // ==========================

  const features =
    new APIFeatures(

      MenuItem.find(filters),

      queryParams

    )

    .sort()

    .limitFields()

    .paginate();

  // ==========================
  // EXECUTE
  // ==========================

  const menuItems =
    await features.query;

  // ==========================
  // CACHE STORE
  // ==========================

  await cacheService.set(

    cacheKey,

    menuItems,

    300

  );

  return menuItems;

};

// ==============================
// ADD MENU ITEM
// ==============================

exports.addMenuItem =
async (

  user,

  body,

  file

) => {

  const item =
    await MenuItem.create({

      ...body,

      restaurantId:
        user.restaurantId,

      image:
        file?.path || '',

      isAvailable:
        true

    });

  // ==========================
  // CLEAR CACHE
  // ==========================

  if (

    cacheService.delByPattern

  ) {

    await cacheService
      .delByPattern(
        'menu:*'
      );

  }

  return item;

};

// ==============================
// UPDATE MENU ITEM
// ==============================

exports.updateMenuItem =
async (

  user,

  itemId,

  body,

  file

) => {

  const existingItem =
    await MenuItem.findById(
      itemId
    );

  // ==========================
  // NOT FOUND
  // ==========================

  if (!existingItem) {

    throw new ApiError(

      404,

      'Menu item not found'

    );

  }

  // ==========================
  // OWNERSHIP CHECK
  // ==========================

  if (

    existingItem
      .restaurantId
      .toString()

    !==

    user.restaurantId
      .toString()

  ) {

    throw new ApiError(

      403,

      'Unauthorized'

    );

  }

  const updatedItem =
    await MenuItem
      .findByIdAndUpdate(

        itemId,

        {

          ...body,

          image:
            file?.path ||

            existingItem.image

        },

        {

          new: true

        }

      );

  // ==========================
  // CLEAR CACHE
  // ==========================

  if (

    cacheService.delByPattern

  ) {

    await cacheService
      .delByPattern(
        'menu:*'
      );

  }

  return updatedItem;

};

// ==============================
// DELETE MENU ITEM
// ==============================

exports.deleteMenuItem =
async (

  user,

  itemId

) => {

  const item =
    await MenuItem.findById(
      itemId
    );

  // ==========================
  // NOT FOUND
  // ==========================

  if (!item) {

    throw new ApiError(

      404,

      'Menu item not found'

    );

  }

  // ==========================
  // OWNERSHIP CHECK
  // ==========================

  if (

    item.restaurantId
      .toString()

    !==

    user.restaurantId
      .toString()

  ) {

    throw new ApiError(

      403,

      'Unauthorized'

    );

  }

  await MenuItem
    .findByIdAndDelete(
      itemId
    );

  // ==========================
  // CLEAR CACHE
  // ==========================

  if (

    cacheService.delByPattern

  ) {

    await cacheService
      .delByPattern(
        'menu:*'
      );

  }

};

// ==============================
// UPDATE AVAILABILITY
// ==============================

exports.updateAvailability =
async (

  user,

  itemId,

  isAvailable

) => {

  const existingItem =
    await MenuItem.findById(
      itemId
    );

  // ==========================
  // NOT FOUND
  // ==========================

  if (!existingItem) {

    throw new ApiError(

      404,

      'Menu item not found'

    );

  }

  // ==========================
  // OWNERSHIP CHECK
  // ==========================

  if (

    existingItem
      .restaurantId
      .toString()

    !==

    user.restaurantId
      .toString()

  ) {

    throw new ApiError(

      403,

      'Unauthorized'

    );

  }

  const item =
    await MenuItem
      .findByIdAndUpdate(

        itemId,

        {

          isAvailable

        },

        {

          new: true

        }

      );

  // ==========================
  // CLEAR CACHE
  // ==========================

  if (

    cacheService.delByPattern

  ) {

    await cacheService
      .delByPattern(
        'menu:*'
      );

  }

  return item;

};