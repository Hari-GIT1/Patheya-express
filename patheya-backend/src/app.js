const express = require('express');
const cors = require('cors');

const app = express();

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

console.log('ALLOWED ORIGINS:', allowedOrigins);
console.log('NODE_ENV:', process.env.NODE_ENV);

app.use(cors({
  origin: function(origin, callback) {

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }

  },
  credentials: true
}));

app.use(express.json());

// ROUTES
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

const errorMiddleware =
  require('./middleware/error.middleware');

// KEEP OLD API URLS FOR NOW
app.use('/api/auth', authRoutes);

app.use('/api/menu', menuRoutes);

app.use('/api/orders', orderRoutes);

app.use('/api/restaurants', restaurantRoutes);

app.use('/api/payment', paymentRoutes);

app.use('/api/owner', ownerRoutes);

app.use('/api/discounts', discountRoutes);

app.use(errorMiddleware);

// STATIC
app.use('/uploads', express.static('uploads'));

// HEALTH
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok'
  });
});

// ROOT
app.get('/', (req, res) => {
  res.send('Patheya Express Backend Running');
});

module.exports = app;