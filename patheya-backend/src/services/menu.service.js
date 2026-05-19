const MenuItem =
  require('../models/MenuItem');

// ==============================
// GET PARTNER MENU
// ==============================
exports.getPartnerMenu =
async (

  restaurantId

) => {

  return await MenuItem.find({

    restaurantId

  });

};

// ==============================
// GET RESTAURANT MENU
// ==============================
exports.getRestaurantMenu =
async (

  restaurantId

) => {

  return await MenuItem.find({

    restaurantId

  });

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

  return await MenuItem.create({

    name:
      body.name,

    price:
      body.price,

    category:
      body.category,

    restaurantId:
      user.restaurantId,

    image:
      file?.path

  });

};

// ==============================
// UPDATE MENU ITEM
// ==============================
exports.updateMenuItem =
async (

  itemId,

  body,

  file

) => {

  const item =
    await MenuItem.findById(
      itemId
    );

  if (!item) {

    throw new Error(
      'Item not found'
    );

  }

  return await MenuItem
    .findByIdAndUpdate(

      itemId,

      {

        ...body,

        image:

          file?.filename ||

          item.image

      },

      {

        returnDocument:
          'after'

      }

    );

};

// ==============================
// DELETE MENU ITEM
// ==============================
exports.deleteMenuItem =
async (

  itemId

) => {

  return await MenuItem
    .findByIdAndDelete(
      itemId
    );

};

// ==============================
// UPDATE AVAILABILITY
// ==============================
exports.updateAvailability =
async (

  itemId,

  isAvailable

) => {

  return await MenuItem
    .findByIdAndUpdate(

      itemId,

      {

        isAvailable

      },

      {

        returnDocument:
          'after'

      }

    );

};