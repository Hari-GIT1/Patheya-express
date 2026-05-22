const mongoose =
  require('mongoose');

const deliveryPartnerSchema =
  new mongoose.Schema({

    // ==========================
    // BASIC INFO
    // ==========================

    name: {

      type: String,

      required: true,

      trim: true

    },

    phone: {

      type: String,

      required: true,

      unique: true

    },

    email: {

      type: String,

      unique: true,

      sparse: true

    },

    password: {

      type: String,

      required: true

    },

    // ==========================
    // VEHICLE
    // ==========================

    vehicleType: {

      type: String,

      enum: [

        'bike',

        'scooter',

        'cycle'

      ],

      default: 'bike'

    },

    vehicleNumber: {

      type: String,

      default: ''

    },

    // ==========================
    // STATUS
    // ==========================

    isOnline: {

      type: Boolean,

      default: false

    },

    isAvailable: {

      type: Boolean,

      default: true

    },

    // ==========================
    // CURRENT LOCATION
    // ==========================

    currentLocation: {

      latitude: {

        type: Number,

        default: 0

      },

      longitude: {

        type: Number,

        default: 0

      }

    },

    // ==========================
    // ACTIVE ORDER
    // ==========================

    activeOrderId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: 'Order',

      default: null

    },

    // ==========================
    // PERFORMANCE
    // ==========================

    totalDeliveries: {

      type: Number,

      default: 0

    },

    rating: {

      type: Number,

      default: 5

    }

  }, {

    timestamps: true

  });

// ==============================
// INDEXES
// ==============================

deliveryPartnerSchema.index({

  isOnline: 1,

  isAvailable: 1

});

module.exports =
  mongoose.model(

    'DeliveryPartner',

    deliveryPartnerSchema

  );