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

const ResultSchema = new mongoose.Schema({
    name1: {
        type: String,
        required: true
    },
    name2: {
        type: String,
        required: true
    },
    team1scorer: {
        type: Array
    },
    team2scorer: {
        type: Array
    },
    score1: {
        type: Number,
        required: true
    },
    score2: {
        type: Number,
        required: true
    },
    time1: {
        type: Array
    },
    time2: {
        type: Array
    }
});


const LeaderSchema = new mongoose.Schema({
    managers: {
        type: Array
    },
    wins: {
        type: Array
    },
    draws: {
        type: Array
    },
    loses: {
        type: Array
    },
    games: {
        type: Array
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
        default: 5000000,
    },
    ready: {
        type: String,
        default: 'NO',
    },
    team: [matchSchema],
    team2: [matchSchema],
    matches: [ResultSchema],
    leaderboard: [LeaderSchema]
});


const User = mongoose.model('User', UserSchema);


module.exports = User;