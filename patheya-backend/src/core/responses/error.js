module.exports = (

    res,
  
    message = 'Server Error',
  
    statusCode = 500,
  
    errors = null
  
  ) => {
  
    return res.status(statusCode)
      .json({
  
        success: false,
  
        message,
  
        errors
  
      });
  
  };