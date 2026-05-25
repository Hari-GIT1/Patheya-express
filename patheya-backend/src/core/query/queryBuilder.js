exports.buildOrderQuery = (
    query
  ) => {
  
    const filters = {};
  
    // ==========================
    // STATUS
    // ==========================
  
    if (query.status) {

        // status=placed
      
        if (
          typeof query.status ===
          'string'
        ) {
      
          filters.status =
            query.status;
      
        }
      
      }
      
      // ==========================
      // STATUS IN
      // ==========================
      
      if (query.statusIn) {
      
        filters.status = {
      
          $in:
            query.statusIn
              .split(',')
      
        };
      
      }
  
    // ==========================
    // USER
    // ==========================
  
    if (query.userId) {
  
      filters.userId =
        query.userId;
  
    }
  
    // ==========================
    // RESTAURANT
    // ==========================
  
    if (query.restaurantId) {
  
      filters.restaurantId =
        query.restaurantId;
  
    }
  
    // ==========================
    // DELIVERY PARTNER
    // ==========================
  
    if (
      query.deliveryPartnerId
    ) {
  
      filters.deliveryPartnerId =
        query.deliveryPartnerId;
  
    }
  
    // ==========================
    // PAYMENT STATUS
    // ==========================
  
    if (
      query.paymentStatus
    ) {
  
      filters.paymentStatus =
        query.paymentStatus;
  
    }
  
    return filters;
  
  };