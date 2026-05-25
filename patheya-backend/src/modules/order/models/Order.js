const mongoose =
  require('mongoose');

const {

  ORDER_STATUS,

  PAYMENT_STATUS

} = require(
  '../constants/order.constants'
);

const statusTimelineSchema =
  new mongoose.Schema({

    status: String,

    changedAt: {

      type: Date,

      default: Date.now

    }

  }, {

    _id: false

  });

const orderItemSchema =
  new mongoose.Schema({

    menuItemId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: 'MenuItem'

    },

    name: String,

    price: Number,

    quantity: Number

  }, {

    _id: false

  });

const orderSchema =
  new mongoose.Schema({

    orderNumber: {

      type: String,

      unique: true,

      index: true

    },

    userId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: 'User',

      required: true,

      index: true

    },

    customer: {

      name: String,

      email: String,

      phone: String

    },

    restaurantId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: 'Restaurant',

      required: true,

      index: true

    },

    deliveryPartnerId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: 'DeliveryPartner',

      default: null

    },

    assignedAt: Date,

    liveLocation: {

      latitude: {

        type: Number,

        default: 0

      },

      longitude: {

        type: Number,

        default: 0

      },

      updatedAt: Date

    },

    items: [

      orderItemSchema

    ],

    pricing: {

      subtotal: Number,

      deliveryFee: Number,

      tax: Number,

      discount: Number,

      grandTotal: Number

    },

    total: {

      type: Number,

      default: 0

    },

    orderType: {

      type: String,

      enum: [

        'delivery',

        'pickup'

      ],

      default: 'delivery'

    },

    deliveryAddress: {

      fullAddress: String,

      city: String,

      pincode: String,

      landmark: String,

      latitude: Number,

      longitude: Number

    },

    address: String,

    status: {

      type: String,

      enum: ORDER_STATUS,

      default: 'placed',

      index: true

    },

    statusTimeline: {

      type: [

        statusTimelineSchema

      ],

      default: [

        {

          status: 'placed'

        }

      ]

    },

    paymentStatus: {

      type: String,

      enum: PAYMENT_STATUS,

      default: 'pending',

    },

    paymentMethod: {

      type: String,

      enum: [

        'cod',

        'online'

      ],

      default: 'cod'

    },

    paymentDetails: {

      razorpayOrderId: String,

      razorpayPaymentId: String,

      razorpaySignature: String,

      paidAt: Date,

      failedAt: Date,

      paymentMethod: String

    },

    paymentEvents: [

      {

        type: {

          type: String

        },

        status: String,

        paymentId: String,

        createdAt: {

          type: Date,

          default: Date.now

        }

      }

    ],

    acceptedAt: Date,

    preparingAt: Date,

    readyAt: Date,

    outForDeliveryAt: Date,

    deliveredAt: Date,

    cancelledAt: Date

  }, {

    timestamps: true

  });

orderSchema.index({

  'paymentDetails.razorpayOrderId': 1

});

orderSchema.index({

  restaurantId: 1,

  createdAt: -1

});

orderSchema.index({

  userId: 1,

  createdAt: -1

});

orderSchema.index({

  deliveryPartnerId: 1,

  status: 1

});

orderSchema.index({

  createdAt: -1

});

orderSchema.index({

  paymentStatus: 1

});

orderSchema.pre(

  'save',

  async function() {

    if (!this.orderNumber) {

      const random =

        Math.floor(

          100000 +

          Math.random() * 900000

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