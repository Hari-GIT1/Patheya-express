
const DeliveryPartner =
  require(
    '../models/DeliveryPartner'
  );

// ==============================
// GENERATE TOKEN
// ==============================

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

// ==============================
// REGISTER
// ==============================

exports.register =
async (data) => {

  const existingUser =
    await DeliveryPartner.findOne({

      phone: data.phone

    });

  if (existingUser) {

    throw new Error(
      'Phone already registered'
    );

  }

  const hashedPassword =
    await hashPassword(

      data.password,

      10

    );

  const deliveryPartner =
    await DeliveryPartner.create({

      name: data.name,

      phone: data.phone,

      email: data.email,

      password:
        hashedPassword,

      vehicleType:
        data.vehicleType,

      vehicleNumber:
        data.vehicleNumber

    });

  return {

    token:
    generateToken({

      id:
        deliveryPartner._id,
    
      role:
        'delivery'
    
    })

  };

};

// ==============================
// LOGIN
// ==============================

exports.login =
async (

  phone,

  password

) => {

  const deliveryPartner =
    await DeliveryPartner.findOne({

      phone

    });

  if (!deliveryPartner) {

    throw new Error(
      'Invalid credentials'
    );

  }

  const isMatch =
    await comparePassword(

      password,

      deliveryPartner.password

    );

  if (!isMatch) {

    throw new Error(
      'Invalid credentials'
    );

  }

  return {

    token:
    generateToken({

      id:
        deliveryPartner._id,
    
      role:
        'delivery'
    
    })

  };

};