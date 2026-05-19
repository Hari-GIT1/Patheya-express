const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  restaurantId: { type: String, required: true },

  items: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],

  total: Number,

  orderType: { type: String, enum: ['delivery', 'pickup'], default: 'delivery' },
  address: String,

  status: {
    type: String,
    enum: ['placed','accepted','preparing', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'placed'
  },
  paymentStatus: {
    type: String,
    enum: [
      'pending',
      'paid',
      'failed',
      'refunded'
    ],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);