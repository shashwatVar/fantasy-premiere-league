const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
	Name: {
		type: String,
		required: true,
	},
	Club: {
		type: String,
		required: true,
	},
	League: {
		type: String,
		required: true,
	},
	Position: {
		type: String,
		required: true,
	},
	Rating: {
		type: Number,
	},
	Pace: {
		type: Number,
	},
	Shooting: {
		type: Number,
	},
	Price: {
		type: String,
	},
	Passing: {
		type: Number,
	},
	Dribbling: {
		type: Number,
	},
	Defending: {
		type: Number,
	},
	Phyiscality: {
		type: Number,
	},
	Popularity: {
		type: Number,
	},
	ID: {
		type: Number,
	},
	Country: {
		type: String,
	},
	NationPic: {
		type: String,
	},
	ClubPic: {
		type: String,
	},
	PlayerPic: {
		type: String,
	},
});

const player = mongoose.model('player', PlayerSchema);
module.exports = player;
