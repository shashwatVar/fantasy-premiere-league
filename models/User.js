const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    NAME: {
        type: String
    },
    POSITION: {
        type: String
    },
    RATING: {
        type: Number
    },
    SHOOTING: {
        type: Number
    },
    PASSING: {
        type: Number
    },
    DRIBBLING: {
        type: Number
    },
    DEFENDING: {
        type: Number
    },
    PHYSICAL: {
        type: Number
    },
    MORALE: {
        type: Number,
        default: 100
    }

});


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    roster: [TeamSchema],
    plforward: [TeamSchema],
    plmidfield: [TeamSchema],
    pldefender: [TeamSchema],
    plgk: [TeamSchema],
    transfer: {
        type: Number,
        default: 100000,
    }
});


const User = mongoose.model('User', UserSchema);


module.exports = User;