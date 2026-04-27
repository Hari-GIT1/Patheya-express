const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  category: {
    type: String,
    enum: ['veg', 'non-veg'],
    default: 'veg'
  },

  restaurantId: {
    type: String,
    required: true
  },

  // 🔥 NEW FIELDS
  image: {
    type: String
  },

  isAvailable: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);