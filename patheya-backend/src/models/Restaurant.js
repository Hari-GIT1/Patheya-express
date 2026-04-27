const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisines: [String],
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  rating: Number,
  deliveryTime: Number,
  pickupAvailable: Boolean,
  image: String
});

module.exports = mongoose.model('Restaurant', restaurantSchema);