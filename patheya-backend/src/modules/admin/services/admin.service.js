const User =
  require(
    '../../auth/models/User'
  );

const Admin =
  require(
    '../models/Admin'
  );

const Restaurant =
  require(
    '../../restaurant/models/Restaurant'
  );

const Order =
  require(
    '../../order/models/Order'
  );

const queryService =
  require(
    '../../../core/services/query.service'
  );

const ApiError =
  require(
    '../../../core/errors/ApiError'
  );

const {

  generateToken

} = require(
  '../../auth/services/token.service'
);

const {

  hashPassword,

  comparePassword

} = require(
  '../../auth/services/password.service'
);
const cacheService =
  require(
    '../../../core/cache/cache.service'
  );

// =====================================================
// LOGIN ADMIN
// =====================================================

exports.loginAdmin =
async (

  email,

  password

) => {

  const admin =
    await Admin.findOne({

      email

    }).select('+password');

  if (!admin) {

    throw new ApiError(

      401,

      'Invalid credentials'

    );

  }

  if (!admin.isActive) {

    throw new ApiError(

      403,

      'Admin account disabled'

    );

  }

  const isMatch =
    await comparePassword(

      password,

      admin.password

    );

  if (!isMatch) {

    throw new ApiError(

      401,

      'Invalid credentials'

    );

  }

  admin.lastLogin =
    new Date();

  await admin.save();

  const token =
    generateToken({

      id:
        admin._id,

      role:
        'admin'

    });

  return {

    token,

    admin: {

      id:
        admin._id,

      name:
        admin.name,

      email:
        admin.email,

      role:
        admin.role,

      permissions:
        admin.permissions

    }

  };

};

// =====================================================
// REGISTER ADMIN
// =====================================================

exports.registerAdmin =
async (data) => {

  const existingAdmin =
    await Admin.findOne({

      email:
        data.email

    });

  if (existingAdmin) {

    throw new ApiError(

      400,

      'Admin already exists'

    );

  }

  const hashedPassword =
    await hashPassword(

      data.password

    );

  const admin =
    await Admin.create({

      name:
        data.name,

      email:
        data.email,

      password:
        hashedPassword,

      role:
        data.role || 'admin'

    });

  return admin;

};

// =====================================================
// DASHBOARD
// =====================================================

exports.getDashboardStats =
async () => {

  const [

    totalOrders,

    totalUsers,

    totalRestaurants,

    activeRestaurants,

    totalRevenueData

  ] = await Promise.all([

    Order.countDocuments(),

    User.countDocuments({

      role:
        'customer'

    }),

    Restaurant.countDocuments(),

    Restaurant.countDocuments({

      isOpen: true

    }),

    Order.aggregate([

      {

        $match: {

          paymentStatus:
            'paid'

        }

      },

      {

        $group: {

          _id: null,

          totalRevenue: {

            $sum:
              '$total'

          }

        }

      }

    ])

  ]);

  const totalRevenue =

    totalRevenueData[0]
      ?.totalRevenue || 0;

  return {

    totalOrders,

    totalUsers,

    totalRestaurants,

    activeRestaurants,

    totalRevenue

  };

};

// =====================================================
// GET ORDERS
// =====================================================

exports.getOrders =
async (query) => {

  return await queryService
    .getOrders({

      ...query,

      populate: 'true'

    });

};

// =====================================================
// GET LIVE ORDERS
// =====================================================

exports.getLiveOrders =
async () => {

  return await queryService
    .getOrders({

      statusIn:
        'placed,accepted,preparing,out_for_delivery',

      populate:
        'true',

      limit: 50

    });

};

// =====================================================
// UPDATE ORDER STATUS
// =====================================================

exports.updateOrderStatus =
async (

  orderId,

  status

) => {

  const order =
    await Order.findById(
      orderId
    );

  if (!order) {

    throw new ApiError(

      404,

      'Order not found'

    );

  }

  order.status =
    status;

  order.statusTimeline.push({

    status,

    changedAt:
      new Date()

  });

  await order.save();

  return order;

};

// =====================================================
// GET PENDING RESTAURANTS
// =====================================================

exports.getPendingRestaurants =
async () => {

  return await Restaurant.find({

    $or: [

      {

        approvalStatus:
          'pending'

      },

      {

        approvalStatus:
          { $exists: false }

      },

      {

        approvalStatus:
          null

      }

    ]

  })

  .sort({

    createdAt: -1

  });

};

// =====================================================
// UPDATE RESTAURANT STATUS
// =====================================================

exports.updateRestaurantStatus =
async (

  restaurantId,

  status,

  adminId

) => {

  const restaurant =
    await Restaurant.findById(
      restaurantId
    );

  if (!restaurant) {

    throw new ApiError(

      404,

      'Restaurant not found'

    );

  }

  restaurant.approvalStatus =
    status;

  if (status === 'approved') {

    restaurant.approvedBy =
      adminId;

    restaurant.approvedAt =
      new Date();

    restaurant.isOpen =
      true;

  }

  if (status === 'rejected') {

    restaurant.isOpen =
      false;

  }

  await restaurant.save();
  await cacheService.delByPattern(
    'restaurants:*'
  );

  return restaurant;

};

// =====================================================
// GET USERS
// =====================================================

exports.getUsers =
async (query) => {

  const filter = {};

  if (query.role) {

    filter.role =
      query.role;

  }

  if (query.search) {

    filter.$or = [

      {

        name: {

          $regex:
            query.search,

          $options: 'i'

        }

      },

      {

        email: {

          $regex:
            query.search,

          $options: 'i'

        }

      }

    ];

  }

  return await User.find(filter)

    .select('-password')

    .sort({

      createdAt: -1

    });

};

// =====================================================
// TOGGLE USER BLOCK
// =====================================================

exports.toggleUserBlock =
async (userId) => {

  const user =
    await User.findById(
      userId
    );

  if (!user) {

    throw new ApiError(

      404,

      'User not found'

    );

  }

  user.isBlocked =
    !user.isBlocked;

  await user.save();

  return user;

};
exports.getRestaurantById =
async (

  restaurantId

) => {

  const restaurant =
    await Restaurant
      .findById(
        restaurantId
      );

  if (!restaurant) {

    throw new ApiError(

      404,

      'Restaurant not found'

    );

  }

  return restaurant;

};