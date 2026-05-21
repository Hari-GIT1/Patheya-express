require('dotenv-flow').config();

// VALIDATE ENV
require('./config/validateEnv');

const http = require('http');
const socketIO = require('socket.io');

const app = require('./app');

const connectDB = require('./config/db');

const config = require('./config');

// ==============================
// PORT
// ==============================

const PORT = config.port || 3000;

// ==============================
// CONNECT DATABASE
// ==============================

connectDB();

// ==============================
// CREATE HTTP SERVER
// ==============================

const server = http.createServer(app);

// ==============================
// ALLOWED SOCKET ORIGINS
// ==============================

const allowedOrigins = [

  // LOCALHOST
  'http://localhost:4200',
  'http://localhost:4201',
  'http://localhost:4202',

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

// ==============================
// SOCKET.IO
// ==============================

const io = socketIO(server, {

  cors: {

    origin: function(origin, callback) {

      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log('SOCKET BLOCKED:', origin);

      return callback(
        new Error(`Socket CORS Blocked: ${origin}`)
      );

    },

    methods: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE'
    ],

    credentials: true

  }

});

// MAKE IO AVAILABLE
app.set('io', io);

// ==============================
// SOCKET CONNECTIONS
// ==============================

io.on('connection', (socket) => {

  console.log('SOCKET CONNECTED:', socket.id);

  // ==========================
  // JOIN RESTAURANT ROOM
  // ==========================

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

  // ==========================
  // JOIN ORDER ROOM
  // ==========================

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

  // ==========================
  // JOIN ADMIN ROOM
  // ==========================

  socket.on(
    'joinAdminRoom',
    () => {

      socket.join('admins');

      console.log('ADMIN JOINED');

    }
  );

  // ==========================
  // DISCONNECT
  // ==========================

  socket.on(
    'disconnect',
    () => {

      console.log(
        'SOCKET DISCONNECTED:',
        socket.id
      );

    }
  );

});

// ==============================
// START SERVER
// ==============================

server.listen(

  PORT,

  '0.0.0.0',

  () => {

    console.log(
      `🚀 Server running on port ${PORT}`
    );

  }

);