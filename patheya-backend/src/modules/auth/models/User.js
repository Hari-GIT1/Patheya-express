const mongoose =
  require('mongoose');

const userSchema =
  new mongoose.Schema({

    // ==========================
    // NAME
    // ==========================

    name: {

      type: String,

      required: true,

      trim: true

    },

    // ==========================
    // EMAIL
    // ==========================

    email: {

      type: String,

      required: true,

      unique: true,

      lowercase: true,

      trim: true

    },

    // ==========================
    // PASSWORD
    // ==========================

    password: {

      type: String,

      required: true,

      select: false

    },

    // ==========================
    // ROLE
    // ==========================

    role: {

      type: String,

      enum: [

        'customer',

        'owner',

        'admin'

      ],

      default: 'customer'

    },

    // ==========================
    // RESTAURANT
    // ==========================

    restaurantId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: 'Restaurant',

      default: null

    },

    // ==========================
    // BLOCK STATUS
    // ==========================

    isBlocked: {

      type: Boolean,

      default: false

    }

  }, {

    timestamps: true

  });

// ==============================
// INDEXES
// ==============================

module.exports =
  mongoose.model(

    'User',

    userSchema

  );