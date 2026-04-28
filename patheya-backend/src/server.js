const express = require('express');
const cors = require('cors');
const http = require('http'); // ✅ FIX
const { Server } = require('socket.io');
const connectDB = require('./config/db');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ create HTTP server
const server = http.createServer(app);

// ✅ socket setup
const io = new Server(server, {
  cors: { origin: '*' }
});


app.set('io', io);
connectDB();

// ✅ routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/menu', require('./routes/menu.routes'));
app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/restaurants', require('./routes/restaurant.routes'));
app.use('/uploads', express.static('uploads'));

// ✅ socket connection
io.on('connection', (socket) => {
  socket.on('joinOrderRoom', (orderId) => {
    socket.join(orderId);
  });
});
io.on('connection', (socket) => {
  socket.on('joinRestaurant', (restaurantId) => {
    socket.join(restaurantId);
  });

});

// ❗ IMPORTANT: use server.listen, NOT app.listen
server.listen(3000, () => {
  console.log('Server running on port 3000');
});