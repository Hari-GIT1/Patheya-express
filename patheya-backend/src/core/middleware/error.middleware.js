const errorResponse =
  require(
    '../responses/error'
  );

module.exports = (

  err,

  req,

  res,

  next

) => {

  console.error(err);

  // ==========================
  // API ERROR
  // ==========================

  if (err.statusCode) {

    return errorResponse(

      res,

      err.message,

      err.statusCode

    );

  }

  // ==========================
  // MONGOOSE VALIDATION
  // ==========================

  if (

    err.name ===
    'ValidationError'

  ) {

    return errorResponse(

      res,

      err.message,

      400

    );

  }

  // ==========================
  // JWT
  // ==========================

  if (

    err.name ===
    'JsonWebTokenError'

  ) {

    return errorResponse(

      res,

      'Invalid token',

      401

    );

  }

  // ==========================
  // DEFAULT
  // ==========================

  return errorResponse(

    res,

    'Internal Server Error',

    500

  );

};