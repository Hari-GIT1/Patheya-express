const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { login } = require('../controllers/auth.controller');

const User = require('../models/User');
const { registerOwner } = require('../controllers/auth.controller');

// 🔥 Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword
  });

  await user.save();

  res.json({ message: 'User registered' });
});
router.post('/owner-register', (req, res, next) => {
  console.log('HIT OWNER REGISTER ROUTE ✅');
  next();
}, registerOwner);
router.post('/login', login);
router.get('/test', (req, res) => {
  res.send('Auth working');
});


module.exports = router;