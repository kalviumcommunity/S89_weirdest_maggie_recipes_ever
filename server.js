const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.get('/ping', (req, res) => {
  res.send('pong');
});


app.listen(8000,async()=>{
    try{
     await mongoose.connect('mongodb+srv://madhukiraninaparthi2001:madhukiraninaparthi2006@cluster0.ewsp8.mongodb.net/')
     console.log('connected to mongodb');
    }catch(err){
    console.log(err);
    }
})