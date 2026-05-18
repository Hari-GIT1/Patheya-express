require('dotenv-flow').config();

const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

// CONNECT DATABASE
connectDB();

// CREATE HTTP SERVER
const server = http.createServer(app);

// SOCKET.IO
const io = require('socket.io')(server, {
  cors: {
    origin:
      process.env.NODE_ENV === 'production'
        ? [
            'https://app.patheyaexpress.in',
            'https://partner.patheyaexpress.in'
          ]
        : [
            'http://localhost:4200',
            'http://localhost:4201'
          ],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// MAKE IO AVAILABLE GLOBALLY
app.set('io', io);

// SOCKET CONNECTIONS
io.on('connection', (socket) => {

  console.log('SOCKET CONNECTED');

  // JOIN RESTAURANT ROOM
  socket.on('joinRestaurantRoom', (restaurantId) => {

    socket.join(restaurantId);

    console.log('JOINED RESTAURANT:', restaurantId);

  });

  // JOIN ORDER ROOM
  socket.on('joinOrderRoom', (orderId) => {

    socket.join(orderId);

    console.log('JOINED ORDER:', orderId);

  });

  socket.on('disconnect', () => {

    console.log('SOCKET DISCONNECTED');

  });

});

// START SERVER
server.listen(PORT, '0.0.0.0', () => {

  console.log(`Server running on port ${PORT}`);

});