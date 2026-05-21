const User = require('../../../models/User');

const getUsers = async (query) => {
  const filter = {};

  if (query.role) {
    filter.role = query.role;
  }

  if (query.search) {
    filter.$or = [
      {
        name: {
          $regex: query.search,
          $options: 'i',
        },
      },
      {
        email: {
          $regex: query.search,
          $options: 'i',
        },
      },
    ];
  }

  return await User.find(filter)
    .select('-password')
    .sort({ createdAt: -1 });
};

const toggleUserBlock = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  user.isBlocked = !user.isBlocked;

  await user.save();

  return user;
};

module.exports = {
  getUsers,
  toggleUserBlock,
};