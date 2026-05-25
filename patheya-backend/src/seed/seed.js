require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Order = require('./modules/order/models/Order');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Mongo connected 🌱');
};

const seed = async () => {
  try {
    await connectDB();

    // 🔥 Clear old data
    await User.deleteMany();
    await Restaurant.deleteMany();
    await Order.deleteMany();

    const password = await bcrypt.hash('123456', 10);

    // 👤 USERS
    const users = await User.insertMany([
      { name: 'Hari User', email: 'user@test.com', password, role: 'customer' },
      { name: 'Owner One', email: 'owner1@test.com', password, role: 'owner' },
      { name: 'Owner Two', email: 'owner2@test.com', password, role: 'owner' }
    ]);

    const user = users.find(u => u.role === 'user');
    const owner1 = users.find(u => u.email === 'owner1@test.com');
    const owner2 = users.find(u => u.email === 'owner2@test.com');
    
    // 🔥 SAFETY CHECK
    if (!owner1 || !owner2) {
      throw new Error('Owner users not created properly ❌');
    }

    // 🍽 RESTAURANTS WITH MENU
    const restaurants = await Restaurant.insertMany([
      {
        name: 'Udupi Palace',
        cuisines: ['South Indian'],
        ownerId: owner1._id,
        menu: [
          { name: 'Masala Dosa', price: 80, category: 'veg' },
          { name: 'Idli', price: 50, category: 'veg' }
        ]
      },
      {
        name: 'Biryani House',
        cuisines: ['Hyderabadi'],
        ownerId: owner2._id,
        menu: [
          { name: 'Chicken Biryani', price: 220, category: 'non-veg' },
          { name: 'Mutton Biryani', price: 260, category: 'non-veg' }
        ]
      }
    ]);

    const r1 = restaurants[0];
    const r2 = restaurants[1];

    // 📦 ORDERS
    await Order.insertMany([
      {
        userId: user._id,
        restaurantId: r1._id,
        items: [
          { name: 'Masala Dosa', price: 80, quantity: 2 }
        ],
        totalAmount: 160,
        orderType: 'delivery',
        status: 'Pending'
      },
      {
        userId: user._id,
        restaurantId: r2._id,
        items: [
          { name: 'Chicken Biryani', price: 220, quantity: 1 }
        ],
        totalAmount: 220,
        orderType: 'pickup',
        status: 'Preparing'
      }
    ]);

    console.log('🔥 FULL SEED DONE');
    console.log('------------------------');
    console.log('User → user@test.com / 123456');
    console.log('Owner → owner1@test.com / 123456');

    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();