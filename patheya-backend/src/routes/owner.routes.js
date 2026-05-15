const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.middleware');

const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');


// GET OWNER MENU
router.get('/menu/:restaurantId', async (req, res) => {

  try {

    const items = await MenuItem.find({
      restaurantId: req.params.restaurantId
    });

    res.json(items);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});


// GET OWNER ORDERS
router.get('/orders/:restaurantId', async (req, res) => {

  try {

    const orders = await Order.find({
      restaurantId: req.params.restaurantId
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

module.exports = router;