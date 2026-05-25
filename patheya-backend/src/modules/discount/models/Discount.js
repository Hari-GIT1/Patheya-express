const mongoose =
  require('mongoose');

const discountSchema =
  new mongoose.Schema({

    code: {

      type: String,

      required: true,

      uppercase: true,

      unique: true,

      trim: true

    },

    percentage: {

      type: Number,

      required: true,

      min: 1,

      max: 100

    },

    maxDiscount: {

      type: Number,

      default: 0

    },

    minOrderAmount: {

      type: Number,

      default: 0

    },

    usageLimit: {

      type: Number,

      default: 100

    },

    usedCount: {

      type: Number,

      default: 0

    },

    expiresAt: Date,

    isActive: {

      type: Boolean,

      default: true

    },

    ownerId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: 'User'

    },

    restaurantId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: 'Restaurant'

    }

  }, {

    timestamps: true

  });

module.exports =
  mongoose.model(

    'Discount',

    discountSchema

  );