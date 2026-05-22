const MenuItem =
  require('../../../models/MenuItem');

const APIFeatures =
  require(
    '../../../core/query/apiFeatures'
  );

const cacheService =
  require(
    '../../../core/cache/cache.service'
  );

// ==============================
// GET MENU ITEMS
// ==============================

exports.getMenuItems =
async (queryParams) => {

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
  // BASE FILTER
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

  // VEG
  if (

    queryParams.isVeg

  ) {

    filters.isVeg =

      queryParams.isVeg ===
      'true';

  }

  // AVAILABILITY
  if (

    queryParams.isAvailable

  ) {

    filters.isAvailable =

      queryParams.isAvailable ===
      'true';

  }

  // SEARCH
  if (

    queryParams.search

  ) {

    filters.$text = {

      $search:
        queryParams.search

    };

  }

  // ==========================
  // FEATURES
  // ==========================

  const features =
    new APIFeatures(

      MenuItem.find(filters),

      queryParams

    )

    .sort()

    .limitFields()

    .paginate();

  const menuItems =
    await features.query;

  // ==========================
  // CACHE
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
        file?.path || ''

    });

  // ==========================
  // CLEAR CACHE
  // ==========================

  await cacheService
    .delByPattern('menu:*');

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
  // ITEM NOT FOUND
  // ==========================

  if (!existingItem) {

    throw new Error(
      'Menu item not found'
    );

  }

  // ==========================
  // OWNERSHIP VALIDATION
  // ==========================

  if (

    existingItem
      .restaurantId
      .toString()

    !==

    user.restaurantId
      .toString()

  ) {

    throw new Error(
      'Unauthorized menu access'
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

  await cacheService
    .delByPattern('menu:*');

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
  // ITEM NOT FOUND
  // ==========================

  if (!item) {

    throw new Error(
      'Menu item not found'
    );

  }

  // ==========================
  // OWNERSHIP VALIDATION
  // ==========================

  if (

    item.restaurantId
      .toString()

    !==

    user.restaurantId
      .toString()

  ) {

    throw new Error(
      'Unauthorized menu delete'
    );

  }

  await MenuItem
    .findByIdAndDelete(
      itemId
    );

  // ==========================
  // CLEAR CACHE
  // ==========================

  await cacheService
    .delByPattern('menu:*');

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
  // ITEM NOT FOUND
  // ==========================

  if (!existingItem) {

    throw new Error(
      'Menu item not found'
    );

  }

  // ==========================
  // OWNERSHIP VALIDATION
  // ==========================

  if (

    existingItem
      .restaurantId
      .toString()

    !==

    user.restaurantId
      .toString()

  ) {

    throw new Error(
      'Unauthorized menu update'
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

  await cacheService
    .delByPattern('menu:*');

  return item;

};