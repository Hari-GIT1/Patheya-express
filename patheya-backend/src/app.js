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

const app = express();

// ==============================
// ALLOWED ORIGINS
// ==============================
const allowedOrigins =

  process.env.NODE_ENV === 'production'

    ? [

        'https://app.patheyaexpress.in',

        'https://partner.patheyaexpress.in'

      ]

    : [

        'http://localhost:4200',

        'http://localhost:4201'

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
app.use(helmet());

app.use(

  rateLimit({

    windowMs:
      15 * 60 * 1000,

    max: 300,

    message:
      'Too many requests'

  })

);

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
app.use(express.json());


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