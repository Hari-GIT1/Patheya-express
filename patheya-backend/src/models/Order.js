const mongoose = require('mongoose');

// ==============================
// STATUS TIMELINE SCHEMA
// ==============================

const statusTimelineSchema =
  new mongoose.Schema({

    status: {
      type: String,
      required: true
    },

    changedAt: {
      type: Date,
      default: Date.now
    }

  }, {
    _id: false
  });

// ==============================
// ORDER ITEM SCHEMA
// ==============================

const orderItemSchema =
  new mongoose.Schema({

    menuItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Menu'
    },

    name: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    quantity: {
      type: Number,
      required: true
    }

  }, {
    _id: false
  });

// ==============================
// MAIN ORDER SCHEMA
// ==============================

const orderSchema =
  new mongoose.Schema({

    // ==========================
    // ORDER NUMBER
    // ==========================

    orderNumber: {
      type: String,
      unique: true,
      index: true
    },

    // ==========================
    // CUSTOMER
    // ==========================

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },

    customer: {

      name: String,

      email: String,

      phone: String

    },

    // ==========================
    // RESTAURANT
    // ==========================

    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
      index: true
    },

    // ==========================
    // DELIVERY PARTNER
    // ==========================

    deliveryPartnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DeliveryPartner',
      default: null
    },

    assignedAt: Date,

    // ==========================
    // ITEMS
    // ==========================

    items: [orderItemSchema],

    // ==========================
    // PRICING
    // ==========================

    pricing: {

      subtotal: {
        type: Number,
        default: 0
      },

      deliveryFee: {
        type: Number,
        default: 0
      },

      tax: {
        type: Number,
        default: 0
      },

      discount: {
        type: Number,
        default: 0
      },

      grandTotal: {
        type: Number,
        default: 0
      }

    },

    // KEEP OLD TOTAL
    // BACKWARD COMPATIBILITY
    total: {
      type: Number,
      default: 0
    },

    // ==========================
    // ORDER TYPE
    // ==========================

    orderType: {
      type: String,
      enum: [
        'delivery',
        'pickup'
      ],
      default: 'delivery'
    },

    // ==========================
    // DELIVERY ADDRESS
    // ==========================

    deliveryAddress: {

      fullAddress: String,

      city: String,

      pincode: String,

      landmark: String,

      latitude: Number,

      longitude: Number

    },

    // KEEP OLD ADDRESS
    // BACKWARD COMPATIBILITY
    address: String,

    // ==========================
    // ORDER STATUS
    // ==========================

    status: {
      type: String,
      enum: [

        'placed',

        'accepted',

        'preparing',

        'ready',

        'out_for_delivery',

        'delivered',

        'cancelled'

      ],
      default: 'placed'
    },

    // ==========================
    // STATUS TIMELINE
    // ==========================

    statusTimeline: {
      type: [statusTimelineSchema],
      default: [
        {
          status: 'placed'
        }
      ]
    },

    // ==========================
    // PAYMENT STATUS
    // ==========================

    paymentStatus: {
      type: String,
      enum: [

        'pending',

        'paid',

        'failed',

        'refunded'

      ],
      default: 'pending'
    },

    // ==========================
    // PAYMENT DETAILS
    // ==========================

    paymentDetails: {

      razorpayOrderId: String,

      razorpayPaymentId: String,

      paymentMethod: String

    },

    // ==========================
    // TIMESTAMPS
    // ==========================

    acceptedAt: Date,

    preparingAt: Date,

    readyAt: Date,

    outForDeliveryAt: Date,

    deliveredAt: Date,

    cancelledAt: Date

  }, {

    timestamps: true

  });

// ==============================
// INDEXES
// ==============================

orderSchema.index({
  restaurantId: 1,
  createdAt: -1
});

orderSchema.index({
  userId: 1,
  createdAt: -1
});

orderSchema.index({
  status: 1
});

// ==============================
// GENERATE ORDER NUMBER
// ==============================

orderSchema.pre(
  'save',
  function() {

    if (!this.orderNumber) {

      const random =
        Math.floor(
          100000 + Math.random() * 900000
        );

      this.orderNumber =
        `PE${random}`;

    }

  }
);

module.exports =
  mongoose.model(
    'Order',
    orderSchema
  );