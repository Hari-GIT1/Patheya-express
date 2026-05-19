const bcrypt =
  require('bcryptjs');

const User =
  require('../models/User');

const MenuItem =
  require('../models/MenuItem');

const Order =
  require('../models/Order');

const Restaurant =
  require('../models/Restaurant');

const {

  createToken

} = require(
  '../utils/jwt'
);

// ==============================
// REGISTER OWNER
// ==============================
exports.registerOwner =
async (

  ownerData

) => {

  const existingUser =
    await User.findOne({

      email:
        ownerData.email

    });

  if (existingUser) {

    throw new Error(
      'Email already exists'
    );

  }

  const hashedPassword =
    await bcrypt.hash(

      ownerData.password,

      10

    );

  const user =
    await User.create({

      name:
        ownerData.name,

      email:
        ownerData.email,

      password:
        hashedPassword,

      role: 'owner'

    });

  const restaurant =
    await Restaurant.create({

      name:
        ownerData.restaurantName,

      ownerId:
        user._id

    });

  user.restaurantId =
    restaurant._id;

  await user.save();

  return {

    user,

    restaurant

  };

};

// ==============================
// OWNER LOGIN
// ==============================
exports.loginOwner =
async (

  email,

  password

) => {

  const user =
    await User.findOne({

      email,

      role: 'owner'

    });

  if (!user) {

    throw new Error(
      'Invalid credentials'
    );

  }

  const isMatch =
    await bcrypt.compare(

      password,

      user.password

    );

  if (!isMatch) {

    throw new Error(
      'Invalid credentials'
    );

  }

  const token =
    createToken(user);

  return {

    token,

    user: {

      id:
        user._id,

      name:
        user.name,

      email:
        user.email,

      role:
        user.role,

      restaurantId:
        user.restaurantId

    }

  };

};

// ==============================
// GET OWNER MENU
// ==============================
exports.getOwnerMenu =
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
exports.addOwnerMenuItem =
async (

  body,

  restaurantId

) => {

  return await MenuItem.create({

    ...body,

    restaurantId

  });

};

// ==============================
// DELETE MENU ITEM
// ==============================
exports.deleteOwnerMenuItem =
async (

  itemId

) => {

  return await MenuItem
    .findByIdAndDelete(itemId);

};

// ==============================
// GET OWNER ORDERS
// ==============================
exports.getOwnerOrders =
async (

  restaurantId

) => {

  return await Order.find({

    restaurantId

  }).sort({

    createdAt: -1

  });

};

// ==============================
// GET SETTINGS
// ==============================
exports.getOwnerSettings =
async (

  restaurantId

) => {

  const restaurant =
    await Restaurant.findById(
      restaurantId
    );

  return {

    restaurantName:
      restaurant?.name || '',

    phone:
      restaurant?.phone || '',

    email:
      restaurant?.email || '',

    address:
      restaurant?.address || '',

    deliveryTime:
      restaurant?.deliveryTime || '',

    logo:
      restaurant?.logo || '',

    isOpen:
      restaurant?.isOpen ?? true

  };

};

// ==============================
// UPDATE SETTINGS
// ==============================
exports.updateOwnerSettings =
async (

  restaurantId,

  body

) => {

  return await Restaurant
    .findByIdAndUpdate(

      restaurantId,

      {

        name:
          body.restaurantName,

        phone:
          body.phone,

        email:
          body.email,

        address:
          body.address,

        deliveryTime:
          body.deliveryTime,

        logo:
          body.logo,

        isOpen:
          body.isOpen

      },

      {

        returnDocument:
          'after'

      }

    );

};