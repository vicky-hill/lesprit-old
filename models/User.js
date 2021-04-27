const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    }, 
    languages: {
        type: Array,
        default: [{native: 'english', foreign: 'spanish'}],
        required: true
    }
});


module.exports = mongoose.model('User', UserSchema);