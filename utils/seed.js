//--------Requires Connection and Paths for Application to use:
const connection = require('../config/connection');
const { User } = require('../models');
const userData = require('./userData.json');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    //------Drops Existing User
    await User.deleteMany({});
    //------Add Users Collection and Await the Results
    await User.collection.insertMany(userData);
    
    console.table(userData, thoughtData);
    console.info('Seeding complete 🌱');
})