const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth.middleware');

const User = require('../models/User');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');

// =============================
// owner REGISTER
// =============================

router.post('/register', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      restaurantName
    } = req.body;
    // CHECK EXISTING USER
    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: 'Email already exists'
      });

    }
    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);
    // CREATE OWNER USER FIRST
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'owner'
    });

    // CREATE RESTAURANT

    const restaurant =
      await Restaurant.create({
        name: restaurantName,
        ownerId: user._id
      });

    // UPDATE USER WITH RESTAURANT ID

    user.restaurantId = restaurant._id;

    await user.save();

    res.json({

      message: 'Owner registered successfully',

      user,
      restaurant

    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: err.message
    });

  }

});


// =============================
// owner LOGIN
// =============================

router.post('/login', async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      email,
      role: 'owner'
    });

    if (!user) {

      return res.status(400).json({
        message: 'Invalid credentials'
      });

    }

    const isMatch =
      await bcrypt.compare(password, user.password);

    if (!isMatch) {

      return res.status(400).json({
        message: 'Invalid credentials'
      });

    }

    const token = jwt.sign({

      userId: user._id,
      role: user.role,
      restaurantId: user.restaurantId

    },

    process.env.JWT_SECRET,

    {
      expiresIn: '7d'
    });

    res.json({

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        restaurantId: user.restaurantId
      }

    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: err.message
    });

  }

});


// =============================
// GET owner MENU
// =============================

router.get('/menu', auth, async (req, res) => {

  try {

    const items = await MenuItem.find({
      restaurantId: req.user.restaurantId
    });

    res.json(items);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});


// =============================
// ADD MENU ITEM
// =============================

router.post('/menu', auth, async (req, res) => {

  try {

    const item = await MenuItem.create({

      ...req.body,

      restaurantId: req.user.restaurantId

    });

    res.json(item);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});


// =============================
// DELETE MENU ITEM
// =============================

router.delete('/menu/:id', auth, async (req, res) => {

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

});


// =============================
// GET owner ORDERS
// =============================

router.get('/orders', auth, async (req, res) => {

  try {

    const orders = await Order.find({
      restaurantId: req.user.restaurantId
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

// =============================
// GET OWNER SETTINGS
// =============================

router.get('/settings', auth, async (req, res) => {

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

});


// =============================
// UPDATE OWNER SETTINGS
// =============================

router.put('/settings', auth, async (req, res) => {

  try {

    const updatedRestaurant =
      await Restaurant.findByIdAndUpdate(

        req.user.restaurantId,

        {

          name: req.body.restaurantName,

          phone: req.body.phone,

          email: req.body.email,

          address: req.body.address,

          deliveryTime:
            req.body.deliveryTime,

          logo: req.body.logo,

          isOpen: req.body.isOpen

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

});
module.exports = router;