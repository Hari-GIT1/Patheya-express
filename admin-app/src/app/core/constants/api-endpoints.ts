export const API_ENDPOINTS = {

    AUTH: {
  
      LOGIN:
        '/admin/auth/login',
  
      PROFILE:
        '/admin/auth/me'
  
    },
  
    DASHBOARD: {

        STATS:
          '/admin/dashboard'
      
      },
  
    ORDERS: {
  
      LIST:
        '/admin/orders',
  
      LIVE:
        '/admin/orders/live'
  
    },
  
    RESTAURANTS: {

        PENDING:
          '/admin/restaurants/pending',
      
        DETAILS:
          '/admin/restaurants',
      
        UPDATE_STATUS:
          '/admin/restaurants'
      
      },
  
    USERS: {
  
      LIST:
        '/admin/users'
  
    }
  
  };