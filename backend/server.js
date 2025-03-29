const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;
require('dotenv').config();
app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(PORT, async () => {
  try {
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
    console.log('Connected to MongoDB database');
  } catch (err) {
    console.log("failed to connect",err);
  }
  console.log(`Server is running on port ${PORT}`);
});
app.get('/',(req, res) => {
  res.status(201).send('connected to MongoDB server successfully!');
});