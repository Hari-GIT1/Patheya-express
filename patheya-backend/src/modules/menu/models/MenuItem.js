const mongoose =
  require('mongoose');

const menuItemSchema =
  new mongoose.Schema({

    name: {

      type: String,

      required: true,

      trim: true

    },

    description: {

      type: String,

      default: ''

    },

    price: {

      type: Number,

      required: true,

      min: 0

    },

    category: {

      type: String,

      enum: [

        'veg',

        'non-veg'

      ],

      default: 'veg'

    },

    preparationTime: {

      type: Number,

      default: 15

    },

    tags: [

      String

    ],

    restaurantId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: 'Restaurant',

      required: true,

      index: true

    },

    image: {

      type: String,

      default: ''

    },

    isAvailable: {

      type: Boolean,

      default: true

    },

    isDeleted: {

      type: Boolean,

      default: false

    }

  }, {

    timestamps: true

  });

menuItemSchema.index({

  name: 'text',

  category: 'text'

});

menuItemSchema.index({

  restaurantId: 1,

  category: 1

});

module.exports =
  mongoose.model(

    'MenuItem',

    menuItemSchema

  );