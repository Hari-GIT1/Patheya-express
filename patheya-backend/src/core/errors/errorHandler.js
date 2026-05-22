const logger =
  require(
    '../logger/logger'
  );
const {

    errorResponse
  
  } = require(
  
    '../../utils/response'
  
  );
  
  module.exports = (
  
    err,
  
    req,
  
    res,
  
    next
  
  ) => {
  
    logger.error({

        message:
          err.message,
      
        stack:
          err.stack,
      
        path:
          req.originalUrl,
      
        method:
          req.method
      
      });
  
    // ==========================
    // STATUS CODE
    // ==========================
  
    const statusCode =
  
      err.statusCode ||
  
      500;
  
    // ==========================
    // VALIDATION ERRORS
    // ==========================
  
    if (
  
      err.name ===
      'ValidationError'
  
    ) {
  
      return errorResponse(
  
        res,
  
        'Validation Error',
  
        400,
  
        Object.values(
          err.errors
        ).map(
  
          val => val.message
  
        )
  
      );
  
    }
  
    // ==========================
    // MONGOOSE BAD OBJECT ID
    // ==========================
  
    if (
  
      err.name ===
      'CastError'
  
    ) {
  
      return errorResponse(
  
        res,
  
        'Invalid ID',
  
        400
  
      );
  
    }
  
    // ==========================
    // DUPLICATE KEY ERROR
    // ==========================
  
    if (
  
      err.code === 11000
  
    ) {
  
      return errorResponse(
  
        res,
  
        'Duplicate field value',
  
        400
  
      );
  
    }
  
    // ==========================
    // DEFAULT ERROR
    // ==========================
  
    return errorResponse(
  
      res,
  
      err.message ||
  
        'Internal Server Error',
  
      statusCode,
  
      process.env.NODE_ENV ===
      'development'
  
        ? err.stack
  
        : null
  
    );
  
  };