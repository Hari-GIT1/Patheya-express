const {

    body
  
  } = require(
    'express-validator'
  );
  
  exports.placeOrderValidation = [
  
    body('restaurantId')
  
      .notEmpty()
  
      .withMessage(
        'Restaurant ID required'
      ),
  
    body('items')
  
      .isArray({
  
        min: 1
  
      })
  
      .withMessage(
        'Items required'
      ),
  
    body('total')
  
      .isNumeric()
  
      .withMessage(
        'Total must be numeric'
      )
  
  ];