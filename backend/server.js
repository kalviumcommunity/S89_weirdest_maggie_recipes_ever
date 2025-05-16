const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router');
const authRouter = require('./authRouter');
const app = express();
const PORT = 5000;
require('dotenv').config();

// Configure CORS to allow credentials
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000', 'http://127.0.0.1:5000'], // Allow multiple origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser()); // Add cookie parser middleware

app.get('/ping', (req, res) => {
  res.send('pong');
});

// Use routers
app.use('/api', router);
app.use('/auth', authRouter); // Add auth router

app.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB database');
  } catch (err) {
    console.log('Failed to connect to MongoDB:', err);
  }
  console.log(`Server is running on port ${PORT}`);
});