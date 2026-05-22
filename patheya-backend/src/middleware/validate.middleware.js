const {

  validationResult

} = require(

  'express-validator'

);

const ApiError =
  require(
    '../core/errors/ApiError'
  );

module.exports = (

  req,

  res,

  next

) => {

  const errors =
    validationResult(req);

  // ==========================
  // VALIDATION FAILED
  // ==========================

  if (!errors.isEmpty()) {

    return next(

      new ApiError(

        400,

        errors.array()[0].msg

      )

    );

  }

  next();

};