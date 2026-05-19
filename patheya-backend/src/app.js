const express =
  require('express');

const cors =
  require('cors');

const helmet =
  require('helmet');

const rateLimit =
  require('express-rate-limit');

const morgan =
  require('morgan');

const mongoSanitize =
  require(
    'express-mongo-sanitize'
  );

const hpp =
  require('hpp');

const compression =
  require('compression');

const app = express();
app.set(
  'trust proxy',
  1
);
// ==============================
// SECURITY
// ==============================

// SECURE HEADERS
app.use(
  helmet({

    crossOriginResourcePolicy:
      false
  
  })
);

// SANITIZE MONGO
app.use(
  mongoSanitize()
);

// HPP
app.use(
  hpp()
);

// COMPRESSION
app.use(
  compression()
);
// ==============================
// RATE LIMITER
// ==============================

const limiter =
  rateLimit({

    windowMs:
      15 * 60 * 1000,

    max: 300,

    message: {

      success: false,

      message:
        'Too many requests'

    }

  });

app.use(
  '/api',
  limiter
);
const config = require('./config');

// ==============================
// ALLOWED ORIGINS
// ==============================
const allowedOrigins =

  process.env.NODE_ENV === 'production'

    ? [

        'https://app.patheyaexpress.in',

        'https://partner.patheyaexpress.in',

        'https://admin.patheyaexpress.in'

      ]

    : [

        config.urls.customer,

        config.urls.partner,

        config.urls.admin
      ];

console.log(
  'ALLOWED ORIGINS:',
  allowedOrigins
);

console.log(
  'NODE_ENV:',
  process.env.NODE_ENV
);

// ==============================
// SECURITY MIDDLEWARE
// ==============================



// ==============================
// LOGGER
// ==============================
app.use(morgan('dev'));

// ==============================
// CORS
// ==============================
app.use(cors({

  origin: function(

    origin,

    callback

  ) {

    if (

      !origin ||

      allowedOrigins.includes(origin)

    ) {

      callback(null, true);

    } else {

      callback(

        new Error(
          'Not allowed by CORS'
        )

      );

    }

  },

  credentials: true

}));

// ==============================
// BODY PARSER
// ==============================
app.use(
  express.json({

    limit: '10kb'

  })
);

// ==============================
// ROUTES
// ==============================
const authRoutes =
  require('./routes/auth/auth.routes');

const menuRoutes =
  require('./routes/partner/menu.routes');

const orderRoutes =
  require('./routes/customer/order.routes');

const restaurantRoutes =
  require('./routes/customer/restaurant.routes');

const paymentRoutes =
  require('./routes/customer/payment.routes');

const ownerRoutes =
  require('./routes/partner/owner.routes');

const discountRoutes =
  require('./routes/customer/discount.routes');

const adminAuthRoutes = 
 require('./modules/admin/routes/adminAuthRoutes');
 
const adminDashboardRoutes = 
 require('./modules/admin/routes/adminDashboardRoutes');

const adminRestaurantRoutes = 
 require('./modules/admin/routes/adminRestaurantRoutes');

const adminUserRoutes = 
 require('./modules/admin/routes/adminUserRoutes');
const adminOrderRoutes = 
 require('./modules/admin/routes/adminOrderRoutes');
// ==============================
// API ROUTES
// ==============================
app.use(
  '/api/auth',
  authRoutes
);

app.use(
  '/api/menu',
  menuRoutes
);

app.use(
  '/api/orders',
  orderRoutes
);

app.use(
  '/api/restaurants',
  restaurantRoutes
);

app.use(
  '/api/payment',
  paymentRoutes
);

app.use(
  '/api/owner',
  ownerRoutes
);

app.use(
  '/api/discounts',
  discountRoutes
);
app.use(
  '/api/admin/auth',
 adminAuthRoutes
);
app.use(
  '/api/admin/dashboard',
  adminDashboardRoutes
);
app.use(
  '/api/admin/restaurants',
  adminRestaurantRoutes
);
app.use(
  '/api/admin/users',
  adminUserRoutes
);
app.use(
  '/api/admin/orders',
  adminOrderRoutes
);

// ==============================
// HEALTH CHECK
// ==============================
app.get('/health', (

  req,

  res

) => {

  res.status(200).json({

    status: 'ok'

  });

});

// ==============================
// ROOT
// ==============================
app.get('/', (

  req,

  res

) => {

  res.send(
    'Patheya Express Backend Running'
  );

});

// ==============================
// 404 HANDLER
// ==============================
app.use((req, res) => {

  res.status(404).json({

    success: false,

    message: 'Route not found'

  });

});

// ==============================
// ERROR MIDDLEWARE
// ==============================
const errorMiddleware =
  require('./middleware/error.middleware');

app.use(errorMiddleware);

module.exports = app;