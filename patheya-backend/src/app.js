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
  require('express-mongo-sanitize');


const hpp =
  require('hpp');

const compression =
  require('compression');

const config =
  require('./config');
const notFound =
  require(
    './core/errors/notFound'
  );

const errorHandler =
  require(
    './core/errors/errorHandler'
  );

const stream =
  require(
    './core/logger/stream'
  );

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
      false,
  
    contentSecurityPolicy:
      false
  
  })
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

app.use('/api', limiter);

// ==============================
// LOGGER
// ==============================

app.use(

  morgan(

    'combined',

    { stream }

  )

);

// ==============================
// ALLOWED ORIGINS
// ==============================

const allowedOrigins = [

  // LOCALHOST
  'http://localhost:4200',
  'http://localhost:4201',
  'http://localhost:4202',
  'http://localhost:4203',

  // PRODUCTION
  'https://app.patheyaexpress.in',
  'https://partner.patheyaexpress.in',
  'https://admin.patheyaexpress.in',

  // VERCEL
  'https://patheya-admin-app.vercel.app',
  'https://patheya-express-partner.vercel.app',

  // RENDER
  'https://patheya-express.onrender.com',
  'https://patheya-express-uat.onrender.com'
];

console.log('NODE_ENV:', config.nodeEnv);
console.log('ALLOWED ORIGINS:', allowedOrigins);

// ==============================
// CORS
// ==============================

app.use(
  cors({

    origin: function(origin, callback) {

      // POSTMAN / MOBILE APPS
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log('BLOCKED BY CORS:', origin);

      return callback(
        new Error(`CORS NOT ALLOWED: ${origin}`)
      );

    },

    credentials: true,

    methods: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'OPTIONS'
    ],

    allowedHeaders: [
      'Content-Type',
      'Authorization'
    ]

  })
);
// ==============================
// PAYMENT WEBHOOK RAW BODY
// ==============================

app.use(

  '/api/payment/webhook',

  express.raw({

    type: 'application/json'

  })
)


// ==============================
// BODY PARSER
// ==============================
app.use(
  express.json({

    limit: '10kb'

  })
);
app.use(
  express.urlencoded({

    extended: true,

    limit: '10kb'

  })
);
app.use((req, res, next) => {

  const sanitize = (obj) => {

    if (!obj || typeof obj !== 'object') {
      return;
    }

    Object.keys(obj).forEach((key) => {

      if (
        key.includes('$') ||
        key.includes('.')
      ) {

        delete obj[key];

      } else {

        sanitize(obj[key]);

      }

    });

  };

  sanitize(req.body);
  sanitize(req.params);

  next();

});

// ==============================
// ROUTES
// ==============================
const authRoutes =
  require('./modules/auth/routes/auth.routes');

const orderRoutes =
  require('./modules/order/routes/order.routes');

const restaurantRoutes =
  require('./modules/restaurant/routes/restaurant.routes');

const paymentRoutes =
  require('./modules/payment/routes/payment.routes');

const ownerRoutes =
  require('./modules/owner/routes/owner.routes');

const discountRoutes =
  require('./modules/discount/routes/discount.routes');

const adminRoutes =
  require(
    './modules/admin/routes/admin.routes'
  );

const deliveryAuthRoutes =
  require(
    './modules/delivery-partner/routes/auth.routes'
  );
const deliveryOrderRoutes =
  require(
    './modules/delivery-partner/routes/order.routes'
  );
const menuRoutes =
  require(
    './modules/menu/routes/menu.routes'
  );
  const healthRoutes =
  require(
    './modules/health/routes/health.routes'
  );

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

  '/api/admin',

  adminRoutes

);
app.use(
  '/api/delivery',
  deliveryAuthRoutes
);

app.use(
  '/api/delivery/orders',
  deliveryOrderRoutes
);
// ==============================
// HEALTH CHECK
// ==============================

app.use(

  '/health',

  healthRoutes

);

// ==============================
// ROOT
// ==============================

app.get('/', (req, res) => {

  res.send('Patheya Express Backend Running');

});

// ==============================
// 404 HANDLER
// ==============================

app.use(notFound);

// ==============================
// ERROR HANDLER
// ==============================


app.use(errorHandler);
module.exports = app;