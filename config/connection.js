//--------Requiring Mongoose as connecting package:
const { connect, connection } = require("mongoose");

//--------Contect to Mongoose Port 'or' if running locally specified mogoose data base:
const connectionString =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialNetworkDB";

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//--------Connection File:
module.exports = connection;