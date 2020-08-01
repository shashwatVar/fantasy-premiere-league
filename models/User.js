const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Position: {
        type: String,
        required: true
    },
    Rating: {
        type: Number
    },
    Pace: {
        type: Number
    },
    Shooting: {
        type: Number
    },
    Price: {
        type: String
    },
    Passing: {
        type: Number
    },
    Dribbling: {
        type: Number
    },
    Defending: {
        type: Number
    },
    Phyiscality: {
        type: Number
    },
    Popularity: {
        type: Number
    },
    PlayerPic: {
        type: String
    },
    Morale: {
        type: Number,
        default: 100
    },
    Club: {
        type: String,
        required: true
    },
    Country: {
        type: String
    }

});

const matchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    plforward: [TeamSchema],
    plmidfield: [TeamSchema],
    pldefender: [TeamSchema],
    plgk: [TeamSchema],
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
        default: 10000000,
    },
    ready: {
        type: String,
        default: 'NO',
    },
    team: [matchSchema],
    team2: [matchSchema],
});


const User = mongoose.model('User', UserSchema);


module.exports = User;