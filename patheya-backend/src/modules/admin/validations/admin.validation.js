const {

    body
  
  } = require(
    'express-validator'
  );
  
  // =====================================================
  // LOGIN
  // =====================================================
  
  exports.login = [
  
    body('email')
  
      .isEmail()
  
      .withMessage(
        'Valid email required'
      ),
  
    body('password')
  
      .notEmpty()
  
      .withMessage(
        'Password is required'
      )
  
  ];
  
  // =====================================================
  // REGISTER
  // =====================================================
  
  exports.register = [
  
    body('name')
  
      .notEmpty()
  
      .withMessage(
        'Name is required'
      ),
  
    body('email')
  
      .isEmail()
  
      .withMessage(
        'Valid email required'
      ),
  
    body('password')
  
      .isLength({
  
        min: 6
  
      })
  
      .withMessage(
        'Password must be at least 6 characters'
      )
  
  ];
  
  // =====================================================
  // UPDATE ORDER STATUS
  // =====================================================
  
  exports.updateOrderStatus = [
  
    body('status')
  
      .isIn([
  
        'placed',
  
        'accepted',
  
        'preparing',
  
        'ready',
  
        'out_for_delivery',
  
        'delivered',
  
        'cancelled'
  
      ])
  
      .withMessage(
        'Invalid order status'
      )
  
  ];
  
  // =====================================================
  // UPDATE RESTAURANT STATUS
  // =====================================================
  
  exports.updateRestaurantStatus = [
  
    body('status')
  
      .isIn([
  
        'approved',
  
        'rejected',
  
        'suspended'
  
      ])
  
      .withMessage(
        'Invalid restaurant status'
      )
  
  ];