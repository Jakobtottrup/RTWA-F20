const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    gamestate: Object
});
const User = module.exports = mongoose.model('User', UserSchema);