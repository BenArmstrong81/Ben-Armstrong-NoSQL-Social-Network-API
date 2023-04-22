//-----Required express package and paths:
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

//-----Run on Processed Port "or" if none created run on 3001:
const PORT = process.env.PORT || 3001;
const app = express();

//-----Middelware:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//-----API Routes
app.use(routes);


db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API Server Running on Port ${PORT}!`);
    });
  });