const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    userID: {
        type: String
    },
}, {timestamps: true});

const User = mongoose.model('user', userSchema);

module.exports = User;