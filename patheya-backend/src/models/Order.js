const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  restaurantId: { type: String, required: true },
  rating: Number,
  review: String,

  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      _id: mongoose.Schema.Types.ObjectId
    }
  ],

  total: Number,

  orderType: { type: String, enum: ['delivery', 'pickup'], default: 'delivery' },
  address: String,

  status: {
    type: String,
    enum: ['placed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'placed'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);