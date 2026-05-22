

const User =
  require('../models/User');

const Restaurant =
  require('../models/Restaurant');

  const {

    generateToken
  
  } = require(
    '../modules/auth/services/token.service'
  );
  
  const {
  
    hashPassword,
  
    comparePassword
  
  } = require(
    '../modules/auth/services/password.service'
  )

// ==============================
// REGISTER CUSTOMER
// ==============================
exports.registerCustomer =
async (

  userData

) => {

  const existingUser =
    await User.findOne({

      email:
        userData.email

    });

  if (existingUser) {

    throw new Error(
      'Email already exists'
    );

  }

  const comparePassword =
    await hashPassword(

      userData.password,

      10

    );

  const user =
    await User.create({

      name:
        userData.name,

      email:
        userData.email,

      password:
        hashedPassword,

      role: 'customer'

    });

  return user;

};

// ==============================
// LOGIN USER
// ==============================
exports.loginUser =
async (

  email,

  password

) => {

  const user =
    await User.findOne({

      email

    });

  if (!user) {

    throw new Error(
      'Invalid credentials'
    );

  }

  const isMatch =
    await comparePassword(

      password,

      user.password

    );

  if (!isMatch) {

    throw new Error(
      'Invalid credentials'
    );

  }

  const token =
  generateToken({

    id:
      user._id,

    role:
      user.role,

    restaurantId:
      user.restaurantId

  });

return {

  token,

  user: {

    id:
      user._id,

    name:
      user.name,

    email:
      user.email,

    role:
      user.role,

    restaurantId:
      user.restaurantId

  }

}
};

// ==============================
// REGISTER OWNER
// ==============================
exports.registerOwner =
async (

  ownerData

) => {

  const existingUser =
    await User.findOne({

      email:
        ownerData.email

    });

  if (existingUser) {

    throw new Error(
      'Email already exists'
    );

  }

  const hashedPassword =
    await hashPassword(

      ownerData.password,

      10

    );

  const user =
    await User.create({

      name:
        ownerData.name,

      email:
        ownerData.email,

      password:
        hashedPassword,

      role: 'owner'

    });

    const restaurant =
    await Restaurant.create({
  
      name:
        ownerData.restaurantName,
  
      ownerId:
        user._id,
  
      phone:
        ownerData.phone || '',
  
      email:
        ownerData.email || '',
  
      address:
        ownerData.address || '',
  
      approvalStatus:
        'pending',
  
      isOpen: false
  
    });

  user.restaurantId =
    restaurant._id;

  await user.save();

  return {

    user,

    restaurant

  };

};