const User =
  require('../../../models/User');

const Admin =
  require(
    '../../admin/models/Admin'
  );

const DeliveryPartner =
  require(
    '../../delivery-partner/models/DeliveryPartner'
  );

const {

  verifyToken

} = require(
  '../services/token.service'
);

module.exports =
async (

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

      return res.status(401)
        .json({

          success: false,

          message:
            'No token provided'

        });

    }

    const token =
      authHeader.split(' ')[1];

    const decoded =
      verifyToken(token);

    let user = null;

    // ==========================
    // ADMIN
    // ==========================

    if (

      decoded.role ===
      'admin'

    ) {

      user =
        await Admin.findById(
          decoded.id
        );

      req.admin = user;

    }

    // ==========================
    // DELIVERY
    // ==========================

    else if (

      decoded.role ===
      'delivery'

    ) {

      user =
        await DeliveryPartner
          .findById(
            decoded.id
          );

      req.deliveryPartner =
        user;

    }

    // ==========================
    // CUSTOMER / OWNER
    // ==========================

    else {

      user =
        await User.findById(
          decoded.id
        );

      req.user = user;

    }

    if (!user) {

      return res.status(401)
        .json({

          success: false,

          message:
            'User not found'

        });

    }

    req.auth = decoded;

    next();

  }

  catch (err) {

    console.error(err);

    return res.status(401)
      .json({

        success: false,

        message:
          'Invalid token'

      });

  }

};