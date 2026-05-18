const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../../models/User');

const Restaurant = require('../../models/Restaurant');

const {createToken} = require('../../utils/jwt');


// CUSTOMER REGISTER
exports.register = async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: 'Email already exists'
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({

      name,

      email,

      password: hashedPassword,

      role: 'customer'

    });

    res.json({
      message: 'User registered',
      user
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: err.message
    });

  }

};


// LOGIN
exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: 'Invalid credentials'
      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message: 'Invalid credentials'
      });

    }

    const token = createToken(user);

    res.json({

      token,

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,

        restaurantId:
          user.restaurantId

      }

    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: err.message
    });

  }

};


// OWNER REGISTER
exports.registerOwner = async (req, res) => {

  try {

    const {

      name,

      email,

      password,

      restaurantName

    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: 'Email already exists'
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({

      name,

      email,

      password: hashedPassword,

      role: 'owner'

    });

    const restaurant =
      await Restaurant.create({

        name: restaurantName,

        ownerId: user._id

      });

    user.restaurantId =
      restaurant._id;

    await user.save();

    res.json({

      message:
        'Owner registered successfully',

      user,

      restaurant

    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: err.message
    });

  }

};