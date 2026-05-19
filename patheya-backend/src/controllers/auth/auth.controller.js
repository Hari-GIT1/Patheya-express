const asyncHandler =
  require(
    '../../utils/asyncHandler'
  );

const {

  successResponse

} = require(
  '../../utils/response'
);

const authService =
  require(
    '../../services/auth.service'
  );

// ==============================
// CUSTOMER REGISTER
// ==============================
exports.register =
asyncHandler(async (

  req,

  res

) => {

  const user =
    await authService
      .registerCustomer(

        req.body

      );

  successResponse(

    res,

    user,

    'User registered'

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

  const result =
    await authService
      .loginUser(

        req.body.email,

        req.body.password

      );

  successResponse(

    res,

    result,

    'Login successful'

  );

});

// ==============================
// OWNER REGISTER
// ==============================
exports.registerOwner =
asyncHandler(async (

  req,

  res

) => {

  const result =
    await authService
      .registerOwner(

        req.body

      );

  successResponse(

    res,

    result,

    'Owner registered successfully'

  );

});