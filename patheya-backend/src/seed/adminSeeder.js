const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config();

const Admin = require('../modules/admin/models/Admin')

mongoose.connect(process.env.MONGO_URI);

const seed = async () => {

  const hashedPassword = await bcrypt.hash(
    'Admin@123',
    10
  );

  await Admin.create({
    name: 'Hari Haran',
    email: 'admin@patheyaexpress.in',
    password: hashedPassword,
    role: 'super_admin',
    permissions: ['all'],
  });

  console.log('Super admin created');

  process.exit();
};

seed();