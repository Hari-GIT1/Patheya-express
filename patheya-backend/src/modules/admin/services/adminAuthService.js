const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = require('../models/Admin');

const loginAdmin = async (email, password) => {
  const admin = await Admin.findOne({ email });

  if (!admin) {
    throw new Error('Invalid credentials');
  }

  if (!admin.isActive) {
    throw new Error('Admin account disabled');
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    {
      id: admin._id,
      role: admin.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );

  admin.lastLogin = new Date();

  await admin.save();

  return {
    token,
    admin,
  };
};

module.exports = {
  loginAdmin,
};