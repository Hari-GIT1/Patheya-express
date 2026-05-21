const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  name: String,

  email: String,

  password: String,

  role: {

    type: String,

    enum: [

      'customer',

      'owner',

      'admin'

    ],

    default: 'customer'

  },

  restaurantId: {

    type: mongoose.Schema.Types.ObjectId,

    ref: 'Restaurant'

  },
  
  isBlocked: {
    type: Boolean,
    default: false
  }

});

module.exports =
  mongoose.model(
    'User',
    userSchema
  );