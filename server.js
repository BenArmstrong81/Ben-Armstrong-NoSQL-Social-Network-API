const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
// console.log(routes);


const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server for ${activity} running on port ${PORT}!`);
    });
  });
  
// db.once('open', () => {
//   app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
// });