const bcrypt = require('bcryptjs');

const Admin = require(
  '../modules/admin/models/Admin'
);

const seedAdmin = async () => {
  const existingAdmin = await Admin.findOne({
    email: 'admin@patheya.com',
  });

  if (existingAdmin) {
    console.log('Admin already exists');
    return;
  }

  const hashedPassword = await bcrypt.hash(
    'Admin@123',
    10
  );

  await Admin.create({
    name: 'Super Admin',
    email: 'admin@patheya.com',
    password: hashedPassword,
    role: 'super_admin',
  });

  console.log('Admin seeded successfully');
};

module.exports = seedAdmin;