const jwt = require('jsonwebtoken');


// CREATE TOKEN
exports.createToken = (user) => {

  return jwt.sign(

    {

      userId: user._id,

      role: user.role,

      restaurantId:
        user.restaurantId

    },

    process.env.JWT_SECRET,

    {

      expiresIn: '7d'

    }

  );

};


// VERIFY TOKEN
exports.verifyToken = (token) => {

  return jwt.verify(

    token,

    process.env.JWT_SECRET

  );

};