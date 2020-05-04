const mongoose = require('mongoose');
const creds = require('../credentials');
const mongoURL = creds.db.uri;
const connectDB = async () => {
    mongoose.connection.once('open', () => {
        console.log('DB connected..');
    });
    mongoose.connection.on('error', err => {
        console.log('Connection error: ' + err);
    });
    console.log('Connecting...');
    await mongoose.connect(mongoURL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
};
module.exports = connectDB;