const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const router = require('./router'); 
const app = express();
const PORT = 5000;
require('dotenv').config();

app.use(cors());

app.use(express.json());

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use('/api', router);

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