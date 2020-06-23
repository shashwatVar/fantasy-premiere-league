const mongoose = require('mongoose');


const PlayerSchema = new mongoose.Schema({
    NAME: {
        type: String,
        required: true
    },
    CLUB: {
        type: String,
        required: true
    },
    LEAGUE: {
        type: String,
        required: true
    },
    POSITION: {
        type: String,
        required: true
    },
    TIER: {
        type: String,
        required: true
    },
    RATING: {
        type: Number
    },
    PACE: {
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
    LOADDATE: {
        type: Date
    },
    ID: {
        type: Number
    }
});


const player = mongoose.model('player', PlayerSchema);
module.exports = player;