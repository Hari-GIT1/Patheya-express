const mongoose = require('mongoose');

const restaurantSchema =
  new mongoose.Schema({

    name: String,

    cuisines: [String],

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    rating: Number,

    deliveryTime: String,

    pickupAvailable: Boolean,

    image: String,

    // SETTINGS FIELDS

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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
    },
    
    approvedAt: {
      type: Date
    }
  },{
    timestamps: true
  });

module.exports =
  mongoose.model(
    'Restaurant',
    restaurantSchema
  );