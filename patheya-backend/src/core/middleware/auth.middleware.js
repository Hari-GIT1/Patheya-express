const User =
  require('../../modules/auth/models/User');

const Admin =
  require(
    '../../modules/admin/models/Admin'
  );

const DeliveryPartner =
  require(
    '../../modules/delivery-partner/models/DeliveryPartner'
  );

const ApiError =
  require(
    '../errors/ApiError'
  );

const {

  verifyToken

} = require(
  '../../modules/auth/services/token.service'
);

module.exports =
async (

  req,

  res,

  next

) => {

  try {

    // ==========================
    // AUTH HEADER
    // ==========================

    const authHeader =
      req.headers.authorization;

    if (

      !authHeader ||

      !authHeader.startsWith(
        'Bearer '
      )

    ) {

      return next(

        new ApiError(

          401,

          'No token provided'

        )

      );

    }

    // ==========================
    // TOKEN
    // ==========================

    const token =
      authHeader.split(' ')[1];

    // ==========================
    // VERIFY
    // ==========================

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

    // ==========================
    // NOT FOUND
    // ==========================

    if (!user) {

      return next(

        new ApiError(

          401,

          'User not found'

        )

      );

    }

    // ==========================
    // BLOCKED USER
    // ==========================

    if (

      user.isBlocked === true

    ) {

      return next(

        new ApiError(

          403,

          'Account blocked'

        )

      );

    }

    // ==========================
    // AUTH
    // ==========================

    req.auth = decoded;
    console.log(decoded);
console.log(req.admin);
console.log(req.user);

    next();

  }

  catch (error) {

    next(

      new ApiError(

        401,

        'Invalid token'

      )

    );

  }

};