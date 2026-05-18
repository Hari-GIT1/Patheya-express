const express = require('express');

const router = express.Router();

const Order = require('../models/Order');

const auth = require('../middleware/auth.middleware');


// ==============================
// ✅ PLACE ORDER
// ==============================
router.post('/', async (req, res) => {

  try {

    const {
      userId,
      restaurantId,
      items,
      total
    } = req.body;

    if (
      !userId ||
      !restaurantId ||
      !items ||
      !total
    ) {

      return res.status(400).json({
        message: 'Missing fields'
      });

    }

    const order = await Order.create({

      userId,
      restaurantId,
      items,
      total,
      status: 'placed'

    });

    // ✅ EMIT TO RESTAURANT ROOM
    const io = req.app.get('io');

    io.to(restaurantId)
      .emit('newOrder', order);

    res.json(order);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: err.message
    });

  }

});


// ==============================
// ✅ PARTNER ORDERS
// ==============================
router.get(
  '/partner',
  auth,
  async (req, res) => {

    try {

      const orders = await Order.find({

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

  }
);


// ==============================
// ✅ CUSTOMER ORDERS
// ==============================
router.get(
  '/user/:userId',
  async (req, res) => {

    try {

      const orders = await Order.find({

        userId:
          req.params.userId

      }).sort({
        createdAt: -1
      });

      res.json(orders);

    } catch (err) {

      res.status(500).json({
        message: err.message
      });

    }

  }
);


// ==============================
// ✅ RESTAURANT ORDERS
// (KEEPING FOR CUSTOMER APP)
// ==============================
router.get(
  '/restaurant/:restaurantId',
  async (req, res) => {

    try {

      const orders = await Order.find({

        restaurantId:
          req.params.restaurantId

      }).sort({
        createdAt: -1
      });

      res.json(orders);

    } catch (err) {

      res.status(500).json({
        message: err.message
      });

    }

  }
);


// ==============================
// ✅ GET SINGLE ORDER
// ==============================
router.get('/:id', async (req, res) => {

  try {

    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {

      return res.status(404).json({
        message: 'Order not found'
      });

    }

    res.json(order);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});


// ==============================
// ✅ UPDATE STATUS
// ==============================
router.patch(
  '/:id/status',
  auth,
  async (req, res) => {

    try {

      const { status } = req.body;

      const order =
        await Order.findByIdAndUpdate(

          req.params.id,

          { status },

          { new: true }

        );

      // ✅ EMIT STATUS UPDATE
      const io = req.app.get('io');

      io.to(order.restaurantId)
        .emit(
          'orderStatusUpdated',
          order
        );

      io.to(order._id.toString())
        .emit(
          'orderStatusUpdated',
          order
        );

      res.json(order);

    } catch (err) {

      res.status(500).json({
        error: err.message
      });

    }

  }
);


// ==============================
// ✅ KEEP PUT ROUTE
// (DO NOT BREAK CUSTOMER APP)
// ==============================
router.put(
  '/:id/status',
  async (req, res) => {

    try {

      const { status } = req.body;

      const order =
        await Order.findByIdAndUpdate(

          req.params.id,

          { status },

          { new: true }

        );

      const io = req.app.get('io');

      io.to(order.restaurantId)
        .emit(
          'orderStatusUpdated',
          order
        );

      io.to(order._id.toString())
        .emit(
          'orderStatusUpdated',
          order
        );

      res.json(order);

    } catch (err) {

      res.status(500).json({
        message: err.message
      });

    }

  }
);

module.exports = router;