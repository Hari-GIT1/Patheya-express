const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = require('../models/Admin');

const loginAdmin = async (email, password) => {

  const admin = await Admin.findOne({
    email,
  });

  if (!admin) {
    throw new Error('Admin not found');
  }

  if (!admin.isActive) {
    throw new Error('Admin account disabled');
  }

  const isMatch = await bcrypt.compare(
    password,
    admin.password
  );

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  admin.lastLogin = new Date();

  await admin.save();

  const token = jwt.sign(
    {
      id: admin._id,
      role: admin.role,
      permissions: admin.permissions,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );

  return {
    token,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      permissions: admin.permissions,
    },
  };
};
const registerAdmin = async (
  data
) => {

  const existingAdmin =
    await Admin.findOne({
      email: data.email
    });

  if (existingAdmin) {
    throw new Error(
      'Admin already exists'
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      data.password,
      10
    );

  const admin =
    await Admin.create({

      name: data.name,

      email: data.email,

      password: hashedPassword,

      role: data.role

    });

  return admin;
};

module.exports = {
  loginAdmin,
  registerAdmin
};