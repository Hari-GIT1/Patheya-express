const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// =========================
// 🔐 LOGIN
// =========================
exports.login = async (req, res) => {
  try {
    console.log('LOGIN BODY:', req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log('USER:', user);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    console.log('PASSWORD IN DB:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('PASSWORD MATCH:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    let restaurant = null;
    let restaurantId = null;

    if (user.role === 'owner') {
      restaurant = await Restaurant.findOne({ ownerId: user._id });
      console.log('RESTAURANT:', restaurant);

      restaurantId = restaurant?._id || null;
    }

    const token = jwt.sign(
      { id: user._id, role: user.role,restaurantId: restaurant?._id || null},
      process.env.JWT_SECRET || 'secret123', // fallback
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        restaurantId,
        restaurantName: restaurant?.name || ''
      }
    });

  } catch (err) {
    console.error('LOGIN ERROR BACKEND:', err); // 🔥 THIS WILL SHOW REAL ISSUE
    res.status(500).json({ message: err.message });
  }
};

// =========================
// 🍽 OWNER REGISTER
// =========================
exports.registerOwner = async (req, res) => {
  console.log('🔥 OWNER REGISTER HIT');
  try {
    const { name, email, password, restaurantName, cuisines } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'owner'
    });
    console.log('✅ USER CREATED:', user);

    const restaurant = await Restaurant.create({
      name: restaurantName,
      cuisines,
      ownerId: user._id
    });
    console.log('✅ RESTAURANT CREATED:', restaurant);

    const token = jwt.sign(
      { id: user._id, role: user.role,restaurantId: restaurant._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        restaurantId: restaurant._id,
        restaurantName: restaurant?.name || ''
      },
      restaurant
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating owner' });
  }
};