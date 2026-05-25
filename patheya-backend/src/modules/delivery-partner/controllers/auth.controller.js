const asyncHandler =
  require(
    '../../../core/utils/asyncHandler'
  );

const {

  successResponse,

  errorResponse

} = require(
  '../../../core/responses/response'
);

const authService =
  require(
    '../services/auth.service'
  );

// ==============================
// REGISTER
// ==============================

exports.register =
asyncHandler(async (

  req,

  res

) => {

  const data =
    await authService.register(

      req.body

    );

  successResponse(

    res,

    data,

    'Delivery partner registered'

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

  const data =
    await authService.login(

      req.body.phone,

      req.body.password

    );

  successResponse(

    res,

    data,

    'Login successful'

  );

});