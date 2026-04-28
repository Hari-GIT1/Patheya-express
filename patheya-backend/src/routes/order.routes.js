const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// 🧾 Place order (you likely already have this)
router.post('/', async (req, res) => {
  try {
    const { userId, restaurantId, items, total } = req.body;

    if (!userId || !restaurantId || !items || !total) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const order = await Order.create({
      userId,
      restaurantId,
      items,
      total,
      status: 'placed'
    });
    const io = req.app.get('io');

    io.to(restaurantId.toString()).emit('restaurantOrderUpdate', order);

    console.log('🚀 ORDER EMITTED TO RESTAURANT:', restaurantId);

    res.json(order);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// 📦 Get orders for a restaurant
router.get('/restaurant/:restaurantId', async (req, res) => {
  try {
    const orders = await Order.find({
      restaurantId: req.params.restaurantId
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// 🔄 Update status (for admin/restaurant side)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    // 🔥 emit to that order room
    const io = req.app.get('io');
    io.to(order._id.toString()).emit('orderStatusUpdated', order);

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;