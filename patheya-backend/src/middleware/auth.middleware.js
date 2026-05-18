const {

  verifyToken

} = require('../utils/jwt');

const User =
  require('../models/User');

module.exports = async (

  req,

  res,

  next

) => {

  try {

    const authHeader =
      req.headers.authorization;

    if (

      !authHeader ||

      !authHeader.startsWith(
        'Bearer '
      )

    ) {

      return res.status(401).json({

        message:
          'No token provided'

      });

    }

    const token =
      authHeader.split(' ')[1];

    const decoded =
      verifyToken(token);

    const user =
      await User.findById(
        decoded.userId
      );

    if (!user) {

      return res.status(401).json({

        message:
          'User not found'

      });

    }

    req.user = user;

    next();

  } catch (err) {

    console.error(err);

    res.status(401).json({

      message:
        'Invalid token'

    });

  }

};