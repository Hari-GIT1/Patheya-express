const adminOrderService = require(
    '../services/adminOrderService'
  );
  const Order =
  require('../../../models/Order');
const { updateOrderStatus } = require('../../../controllers/customer/order.controller');
  
  const getOrders = async (req, res) => {
    try {
      const orders =
        await adminOrderService.getOrders(
          req.query
        );
  
      res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  const getLiveOrders = async (
    req,
    res
  ) => {
    try {
      const orders =
        await adminOrderService.getLiveOrders();
  
      res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    
  };

exports.updateOrderStatus =
async (req, res) => {

  try {

    const { status } =
      req.body;

    const order =
      await Order.findByIdAndUpdate(

        req.params.id,

        { status },

        { new: true }

      );

    if (!order) {

      return res.status(404)
        .json({

          success: false,

          message:
            'Order not found'

        });

    }

    // SOCKETS
    const io =
      req.app.get('io');

    // CUSTOMER
    io.to(
      order._id.toString()
    ).emit(
      'orderStatusUpdated',
      order
    );

    // PARTNER
    io.to(
      order.restaurantId.toString()
    ).emit(
      'orderStatusUpdated',
      order
    );

    // ADMIN
    io.to('admins')
      .emit(
        'adminOrderUpdated',
        {
          order
        }
      );

    res.json({

      success: true,

      data: order

    });

  }

  catch (err) {

    console.error(err);

    res.status(500)
      .json({

        success: false,

        message:
          'Server error'

      });

  }

};
  
  
  module.exports = {
    getOrders,
    getLiveOrders,
    updateOrderStatus
    
  };