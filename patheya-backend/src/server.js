require('dotenv-flow').config();

// VALIDATE ENV
require('./config/validateEnv');

const http =
  require('http');

const socketIO =
  require('socket.io');

const app =
  require('./app');

const connectDB =
  require('./config/db');

const config =
  require('./config');

// PORT
const PORT =
  config.port || 3000;

// CONNECT DATABASE
connectDB();

// CREATE HTTP SERVER
const server =
  http.createServer(app);

// SOCKET.IO
const io =
  socketIO(server, {

    cors: {

      origin:

        config.nodeEnv === 'production'

          ? [

              'https://app.patheyaexpress.in',

              'https://partner.patheyaexpress.in'

            ]

          : [

              'http://localhost:4200',

              'http://localhost:4201'

            ],

      methods: [

        'GET',

        'POST',

        'PATCH',

        'PUT',

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
io.on(

  'connection',

  (socket) => {

    console.log(

      'SOCKET CONNECTED:',

      socket.id

    );

    // JOIN RESTAURANT ROOM
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

    // JOIN ORDER ROOM
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

    // DISCONNECT
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

// START SERVER
server.listen(

  PORT,

  '0.0.0.0',

  () => {

    console.log(

      `🚀 Server running on port ${PORT}`

    );

  }

);