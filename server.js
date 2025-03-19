const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(PORT, async () => {
  try {
    await mongoose.connect('mongodb+srv://madhukiraninaparthi2001:madhukiraninaparthi2006@cluster0.ewsp8.mongodb.net/');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }
  console.log(`Server is running on port ${PORT}`);
});
