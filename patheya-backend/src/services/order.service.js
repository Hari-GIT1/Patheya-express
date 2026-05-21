const Order =
  require('../models/Order');

// ==============================
// CREATE ORDER
// ==============================

exports.createOrder =
async (

  userId,

  orderData

) => {
  console.log('ORDER DATA:', orderData);

  // ==========================
  // PRICING
  // ==========================

  const subtotal =
    orderData.items.reduce(

      (acc, item) => {

        return (
          acc +
          (item.price * item.quantity)
        );

      },

      0

    );

  const deliveryFee =
    orderData.deliveryFee || 0;

  const tax =
    orderData.tax || 0;

  const discount =
    orderData.discount || 0;

  const grandTotal =
    subtotal +
    deliveryFee +
    tax -
    discount;

  // ==========================
  // CREATE ORDER
  // ==========================

  const order =
    await Order.create({

      userId,

      restaurantId:
        orderData.restaurantId,

      items:
        orderData.items,

      // ======================
      // PRICING
      // ======================

      pricing: {

        subtotal,

        deliveryFee,

        tax,

        discount,

        grandTotal

      },

      // BACKWARD COMPATIBILITY
      total: grandTotal,

      // ======================
      // ORDER TYPE
      // ======================

      orderType:
        orderData.orderType || 'delivery',

      // ======================
      // ADDRESS
      // ======================

      address:
        orderData.address || '',

      deliveryAddress:
        orderData.deliveryAddress || {},

      // ======================
      // CUSTOMER SNAPSHOT
      // ======================

      customer: {

        name:
          orderData.customer?.name || '',

        email:
          orderData.customer?.email || '',

        phone:
          orderData.customer?.phone || ''

      },

      // ======================
      // STATUS
      // ======================

      status: 'placed',

      statusTimeline: [
        {
          status: 'placed'
        }
      ]

    });

  return order;

};

// ==============================
// GET PARTNER ORDERS
// ==============================

exports.getPartnerOrders =
async (restaurantId) => {

  return await Order.find({

    restaurantId

  })

  .sort({

    createdAt: -1

  });

};

// ==============================
// GET USER ORDERS
// ==============================

exports.getUserOrders =
async (userId) => {

  return await Order.find({

    userId

  })

  .sort({

    createdAt: -1

  });

};