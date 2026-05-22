const jwt =
  require('jsonwebtoken');

const DeliveryPartner =
  require(
    '../models/DeliveryPartner'
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

    if (!authHeader) {

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
      jwt.verify(

        token,

        process.env.JWT_SECRET

      );

    const deliveryPartner =
      await DeliveryPartner.findById(

        decoded.id

      );

    if (!deliveryPartner) {

      return res.status(401)
      .json({

        success: false,

        message:
          'Invalid token'

      });

    }

    req.deliveryPartner =
      deliveryPartner;

    next();

  }

  catch (error) {

    return res.status(401)
    .json({

      success: false,

      message:
        'Unauthorized'

    });

  }

};