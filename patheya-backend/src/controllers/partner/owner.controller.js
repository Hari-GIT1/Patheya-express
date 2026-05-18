const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../../models/User');

const MenuItem = require('../../models/MenuItem');

const Order = require('../../models/Order');

const Restaurant = require('../../models/Restaurant');

const {createToken} = require('../../utils/jwt');


// OWNER REGISTER
exports.registerOwner = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      restaurantName
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: 'Email already exists'
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({

      name,

      email,

      password: hashedPassword,

      role: 'owner'

    });

    const restaurant =
      await Restaurant.create({

        name: restaurantName,

        ownerId: user._id

      });

    user.restaurantId =
      restaurant._id;

    await user.save();

    res.json({

      message:
        'Owner registered successfully',

      user,

      restaurant

    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: err.message
    });

  }

};


// OWNER LOGIN
exports.loginOwner = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user =
      await User.findOne({

        email,

        role: 'owner'

      });

    if (!user) {

      return res.status(400).json({
        message: 'Invalid credentials'
      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message: 'Invalid credentials'
      });

    }

    const token = createToken(user);

    res.json({

      token,

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,

        restaurantId:
          user.restaurantId

      }

    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: err.message
    });

  }

};


// GET OWNER MENU
exports.getOwnerMenu = async (req, res) => {

  try {

    const items =
      await MenuItem.find({

        restaurantId:
          req.user.restaurantId

      });

    res.json(items);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};


// ADD MENU ITEM
exports.addOwnerMenuItem = async (req, res) => {

  try {

    const item =
      await MenuItem.create({

        ...req.body,

        restaurantId:
          req.user.restaurantId

      });

    res.json(item);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};


// DELETE MENU ITEM
exports.deleteOwnerMenuItem = async (req, res) => {

  try {

    await MenuItem.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: 'Deleted successfully'
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};


// GET OWNER ORDERS
exports.getOwnerOrders = async (req, res) => {

  try {

    const orders =
      await Order.find({

        restaurantId:
          req.user.restaurantId

      }).sort({
        createdAt: -1
      });

    res.json(orders);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};


// GET SETTINGS
exports.getOwnerSettings = async (req, res) => {

  try {

    const restaurant =
      await Restaurant.findById(
        req.user.restaurantId
      );

    res.json({

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

    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};


// UPDATE SETTINGS
exports.updateOwnerSettings = async (req, res) => {

  try {

    const updatedRestaurant =
      await Restaurant.findByIdAndUpdate(

        req.user.restaurantId,

        {

          name:
            req.body.restaurantName,

          phone:
            req.body.phone,

          email:
            req.body.email,

          address:
            req.body.address,

          deliveryTime:
            req.body.deliveryTime,

          logo:
            req.body.logo,

          isOpen:
            req.body.isOpen

        },

        {
          new: true
        }

      );

    res.json(updatedRestaurant);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};