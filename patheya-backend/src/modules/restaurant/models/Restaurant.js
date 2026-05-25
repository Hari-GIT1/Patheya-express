const mongoose =
  require('mongoose');

const restaurantSchema =
  new mongoose.Schema({

    name: {

      type: String,

      required: true,

      trim: true,

      index: true

    },

    cuisines: [

      String

    ],

    ownerId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: 'User',

      required: true,

      index: true

    },

    rating: {

      type: Number,

      default: 0

    },

    deliveryTime: {

      type: String,

      default: ''

    },

    pickupAvailable: {

      type: Boolean,

      default: false

    },

    image: {

      type: String,

      default: ''

    },

    phone: String,

    email: String,

    address: String,

    logo: String,

    isOpen: {

      type: Boolean,

      default: true

    },

    approvalStatus: {

      type: String,

      enum: [

        'pending',

        'approved',

        'rejected',

        'suspended'

      ],

      default: 'pending'

    },

    approvedBy: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: 'Admin'

    },

    approvedAt: Date,

    location: {

      type: {

        type: String,

        enum: ['Point'],

        default: 'Point'

      },

      coordinates: {

        type: [Number],

        default: [0, 0]

      }

    },

    isDeleted: {

      type: Boolean,

      default: false

    }

  }, {

    timestamps: true

  });

restaurantSchema.index({

  location: '2dsphere'

});

restaurantSchema.index({

  approvalStatus: 1,

  isOpen: 1

});

module.exports =
  mongoose.model(

    'Restaurant',

    restaurantSchema

  );