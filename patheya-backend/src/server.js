const express = require('express');
const cors = require('cors');
const http = require('http'); // ✅ FIX
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const discountRoutes =
  require('./routes/discount.routes');

const PORT = process.env.PORT || 3000;
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [
      'https://app.patheyaexpress.in',
      'https://partner.patheyaexpress.in'
    ]
  : [
      'http://localhost:4200',
      'http://localhost:4201'
    ];
  
require('dotenv-flow').config();
console.log('ALLOWED ORIGINS:', allowedOrigins);
console.log('NODE_ENV:', process.env.NODE_ENV);

const app = express();

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
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok'
  });
});
app.use(express.json());

// ✅ create HTTP server
const server = http.createServer(app);

// ✅ socket setup
const io = require('socket.io')(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST']
  }
});

app.set('io', io);
connectDB();

// ✅ routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/menu', require('./routes/menu.routes'));
app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/restaurants', require('./routes/restaurant.routes'));
app.use('/uploads', express.static('uploads'));
app.use('/api/payment', require('./routes/payment.routes'));
app.use('/api/owner', require('./routes/owner.routes'));
app.use('/api/discounts', discountRoutes);

// ✅ socket connection
io.on('connection', (socket) => {

  console.log('SOCKET CONNECTED');

  // ✅ JOIN RESTAURANT ROOM
  socket.on(
    'joinRestaurantRoom',
    (restaurantId) => {

      socket.join(restaurantId);

      console.log(
        'JOINED RESTAURANT:',
        restaurantId
      );

    }
  );

  // ✅ JOIN ORDER ROOM
  socket.on(
    'joinOrderRoom',
    (orderId) => {

      socket.join(orderId);

      console.log(
        'JOINED ORDER:',
        orderId
      );

    }
  );

  socket.on('disconnect', () => {

    console.log('SOCKET DISCONNECTED');

  });

});
app.get('/', (req, res) => {
  res.send('Patheya Express Backend Running');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});