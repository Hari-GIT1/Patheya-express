const Order = require('../../models/Order');


// ==============================
// PLACE ORDER
// ==============================
exports.placeOrder = async (req, res) => {

    try {
  
      const {
  
        restaurantId,
  
        items,
  
        total
  
      } = req.body;
  
      // GET USER FROM JWT
      const userId =
        req.user._id;
  
      // VALIDATION
      if (
  
        !restaurantId ||
  
        !items ||
  
        !total
  
      ) {
  
        return res.status(400).json({
  
          message: 'Missing fields'
  
        });
  
      }
  
      // CREATE ORDER
      const order =
        await Order.create({
  
          userId,
  
          restaurantId,
  
          items,
  
          total,
  
          status: 'placed'
  
        });
  
      // SOCKET EVENT
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
  
  };


// ==============================
// PARTNER ORDERS
// ==============================
exports.getPartnerOrders = async (req, res) => {

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

};


// ==============================
// CUSTOMER ORDERS
// ==============================
exports.getUserOrders = async (req, res) => {

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

};


// ==============================
// RESTAURANT ORDERS
// ==============================
exports.getRestaurantOrders = async (req, res) => {

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

};


// ==============================
// GET SINGLE ORDER
// ==============================
exports.getOrderById = async (req, res) => {

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

};


// ==============================
// UPDATE STATUS
// ==============================
exports.updateOrderStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const order =
      await Order.findByIdAndUpdate(

        req.params.id,

        { status },

        { new: true }

      );

    // SOCKET EVENT
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

};