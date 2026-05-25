require('dotenv-flow').config();

// ==============================
// VALIDATE ENV
// ==============================

require('./config/validateEnv');
require(
  './modules/order/subscribers/order.subscriber'
);
require(
  './modules/queue/workers/order.worker'
);
require(
  './modules/order/events/order.listeners'
);
require(
  './modules/payment/events/payment.listeners'
);

// ==============================
// CORE
// ==============================

const http =
  require('http');

const socketIO =
  require('socket.io');

// ==============================
// APP
// ==============================

const app =
  require('./app');

const connectDB =
  require('./config/db');

const config =
  require('./config');

// ==============================
// MODELS
// ==============================

const Order =
  require('./modules/order/models/Order');

// ==============================
// SOCKET SERVICE
// ==============================
const notificationService =
  require(
    './core/notifications/notification.service'
  );

const SocketService =
  require(
    './modules/socket/services/socket.service'
  );

// ==============================
// PORT
// ==============================

const PORT =
  config.port || 3000;

// ==============================
// CONNECT DATABASE
// ==============================

connectDB();

// ==============================
// CREATE SERVER
// ==============================

const server =
  http.createServer(app);

// ==============================
// ALLOWED SOCKET ORIGINS
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

// ==============================
// SOCKET.IO
// ==============================

const io = socketIO(server, {

  cors: {

    origin:
      function(origin, callback) {

        if (!origin) {

          return callback(
            null,
            true
          );

        }

        if (

          allowedOrigins.includes(
            origin
          )

        ) {

          return callback(
            null,
            true
          );

        }

        console.log(
          'SOCKET BLOCKED:',
          origin
        );

        return callback(

          new Error(
            `Socket CORS Blocked: ${origin}`
          )

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

// ==============================
// SOCKET SERVICE INSTANCE
// ==============================

const socketService =
  new SocketService(io);
  notificationService.setSocket(io);

// ==============================
// MAKE AVAILABLE GLOBALLY
// ==============================

app.set('io', io);

app.set(
  'socketService',
  socketService
);

// ==============================
// SOCKET CONNECTIONS
// ==============================

io.on(

  'connection',

  (socket) => {

    console.log(
      'SOCKET CONNECTED:',
      socket.id
    );

    // ==========================
    // JOIN RESTAURANT ROOM
    // ==========================

    socket.on(

      'joinRestaurantRoom',

      (restaurantId) => {

        socket.join(
          restaurantId
        );

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

        socket.join(
          orderId
        );

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

        socket.join(
          'admins'
        );

        console.log(
          'ADMIN JOINED'
        );

      }

    );

    // ==========================
    // JOIN DELIVERY ROOM
    // ==========================

    socket.on(

      'joinDeliveryRoom',

      (deliveryPartnerId) => {

        socket.join(
          deliveryPartnerId
        );

        console.log(

          'DELIVERY JOINED:',

          deliveryPartnerId

        );

      }

    );

    // ==========================
    // DELIVERY LOCATION UPDATE
    // ==========================

    socket.on(

      'deliveryLocationUpdate',

      async (data) => {

        console.log(

          'DELIVERY LOCATION UPDATE:',

          data

        );

        try {

          // ====================
          // UPDATE DB
          // ====================

          await Order.findByIdAndUpdate(

            data.orderId,

            {

              liveLocation: {

                latitude:
                  data.latitude,

                longitude:
                  data.longitude,

                updatedAt:
                  new Date()

              }

            }

          );

          // ====================
          // EMIT TO CUSTOMER
          // ====================

          socketService
            .emitToRoom(

              data.orderId,

              'deliveryLocationUpdated',

              {

                orderId:
                  data.orderId,

                latitude:
                  data.latitude,

                longitude:
                  data.longitude

              }

            );

        }

        catch (error) {

          console.log(error);

        }

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

  }

);
process.on(

  'unhandledRejection',

  (err) => {

    console.error(
      'UNHANDLED REJECTION:',
      err
    );

  }

);

process.on(

  'uncaughtException',

  (err) => {

    console.error(
      'UNCAUGHT EXCEPTION:',
      err
    );

  }

);

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