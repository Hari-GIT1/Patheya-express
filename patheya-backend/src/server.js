const express = require('express');
const cors = require('cors');
const http = require('http'); // ✅ FIX
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 3000;

require('dotenv-flow').config();
console.log('ENV:', process.env.NODE_ENV);
console.log('DB:', process.env.MONGO_URI);

const app = express();

app.use(cors({
  origin: [
    'https://app.patheyaexpress.in'
  ],
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
    origin: 'https://patheya-express.vercel.app',
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

// ✅ socket connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinOrderRoom', (orderId) => {
    socket.join(orderId);
  });
});
app.get('/', (req, res) => {
  res.send('Patheya Express Backend Running');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});