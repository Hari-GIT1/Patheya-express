exports.successResponse = (

  res,

  data = null,

  message = 'Success',

  statusCode = 200,

  pagination = null

) => {

  const response = {

    success: true,

    message,

    data

  };

  // ==========================
  // PAGINATION
  // ==========================

  if (pagination) {

    response.pagination =
      pagination;

  }

  return res
    .status(statusCode)
    .json(response);

};

// ==============================
// ERROR RESPONSE
// ==============================

exports.errorResponse = (

  res,

  message = 'Error',

  statusCode = 500,

  errors = null

) => {

  const response = {

    success: false,

    message

  };

  // ==========================
  // VALIDATION ERRORS
  // ==========================

  if (errors) {

    response.errors =
      errors;

  }

  return res
    .status(statusCode)
    .json(response);

};