const adminAuthService =
  require(
    '../services/adminAuthService'
  );

const asyncHandler =
  require(
    '../../../utils/asyncHandler'
  );

const {

  successResponse

} = require(
  '../../../utils/response'
);

// ==============================
// GET ME
// ==============================

exports.getMe =
asyncHandler(async (

  req,

  res

) => {

  successResponse(

    res,

    req.admin,

    'Admin profile fetched'

  );

});

// ==============================
// LOGIN
// ==============================

exports.login =
asyncHandler(async (

  req,

  res

) => {

  const {

    email,

    password

  } = req.body;

  const data =
    await adminAuthService
      .loginAdmin(

        email,

        password

      );

  successResponse(

    res,

    data,

    'Admin login successful'

  );

});

// ==============================
// REGISTER
// ==============================

exports.register =
asyncHandler(async (

  req,

  res

) => {

  const admin =
    await adminAuthService
      .registerAdmin(

        req.body

      );

  successResponse(

    res,

    admin,

    'Admin created successfully',

    201

  );

});