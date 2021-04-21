const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const player = require('../models/Player');
const User = require('../models/User');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('005add6301a14bf189c4e66cca9ecfdf');

//team management
router.get('/player', ensureAuthenticated, (req, res) => {
	res.render('player', {
		user: req.user,
	});
});

router.get('/matches', ensureAuthenticated, (req, res) => {
	res.render('matches', {
		user: req.user,
	});
});

router.get('/news', ensureAuthenticated, (req, res) => {
	newsapi.v2
		.topHeadlines({
			category: 'sports',
			language: 'en',
			country: 'gb',
		})
		.then((notes) => {
			console.log(notes);
			res.render('news', {
				user: req.user,
				notes: notes,
			});
		})
		.catch((err) => console.log(err));
});

///////////////////////////////////////////////posting the teamsheeet for the matches//////////////////////////////////////
router.post('/player', ensureAuthenticated, (req, res) => {
	User.findOneAndUpdate({name: req.user.name}, {ready: 'YES'}, {useFindAndModify: false}, (err, user) => {
		if (!err) {
			if (user.plforward.length == 0) {
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.forward) {
						user.plforward.push({
							Name: user.roster[x].Name,
							Position: user.roster[x].Position,
							Rating: user.roster[x].Rating,
							Shooting: user.roster[x].Shooting,
							Defending: user.roster[x].Defending,
							Dribbling: user.roster[x].Dribbling,
							Phyiscality: user.roster[x].Phyiscality,
							Passing: user.roster[x].Passing,
							Popularity: user.roster[x].Popularity,
							Club: user.roster[x].Club,
							Country: user.roster[x].Country,
						});
					}
				}
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.rightw) {
						user.plmidfield.push({
							Name: user.roster[x].Name,
							Position: user.roster[x].Position,
							Rating: user.roster[x].Rating,
							Shooting: user.roster[x].Shooting,
							Defending: user.roster[x].Defending,
							Dribbling: user.roster[x].Dribbling,
							Phyiscality: user.roster[x].Phyiscality,
							Passing: user.roster[x].Passing,
							Popularity: user.roster[x].Popularity,
							Club: user.roster[x].Club,
							Country: user.roster[x].Country,
						});
					}
				}
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.leftw) {
						user.plmidfield.push({
							Name: user.roster[x].Name,
							Position: user.roster[x].Position,
							Rating: user.roster[x].Rating,
							Shooting: user.roster[x].Shooting,
							Defending: user.roster[x].Defending,
							Dribbling: user.roster[x].Dribbling,
							Phyiscality: user.roster[x].Phyiscality,
							Passing: user.roster[x].Passing,
							Popularity: user.roster[x].Popularity,
							Club: user.roster[x].Club,
							Country: user.roster[x].Country,
						});
					}
				}
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.leftm) {
						user.plmidfield.push({
							Name: user.roster[x].Name,
							Position: user.roster[x].Position,
							Rating: user.roster[x].Rating,
							Shooting: user.roster[x].Shooting,
							Defending: user.roster[x].Defending,
							Dribbling: user.roster[x].Dribbling,
							Phyiscality: user.roster[x].Phyiscality,
							Passing: user.roster[x].Passing,
							Popularity: user.roster[x].Popularity,
							Club: user.roster[x].Club,
							Country: user.roster[x].Country,
						});
					}
				}
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.rightm) {
						user.plmidfield.push({
							Name: user.roster[x].Name,
							Position: user.roster[x].Position,
							Rating: user.roster[x].Rating,
							Shooting: user.roster[x].Shooting,
							Defending: user.roster[x].Defending,
							Dribbling: user.roster[x].Dribbling,
							Phyiscality: user.roster[x].Phyiscality,
							Passing: user.roster[x].Passing,
							Popularity: user.roster[x].Popularity,
							Club: user.roster[x].Club,
							Country: user.roster[x].Country,
						});
					}
				}
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.centerm) {
						user.plmidfield.push({
							Name: user.roster[x].Name,
							Position: user.roster[x].Position,
							Rating: user.roster[x].Rating,
							Shooting: user.roster[x].Shooting,
							Defending: user.roster[x].Defending,
							Dribbling: user.roster[x].Dribbling,
							Phyiscality: user.roster[x].Phyiscality,
							Passing: user.roster[x].Passing,
							Popularity: user.roster[x].Popularity,
							Club: user.roster[x].Club,
							Country: user.roster[x].Country,
						});
					}
				}
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.leftb) {
						user.pldefender.push({
							Name: user.roster[x].Name,
							Position: user.roster[x].Position,
							Rating: user.roster[x].Rating,
							Shooting: user.roster[x].Shooting,
							Defending: user.roster[x].Defending,
							Dribbling: user.roster[x].Dribbling,
							Phyiscality: user.roster[x].Phyiscality,
							Passing: user.roster[x].Passing,
							Popularity: user.roster[x].Popularity,
							Club: user.roster[x].Club,
							Country: user.roster[x].Country,
						});
					}
				}
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.rightb) {
						user.pldefender.push({
							Name: user.roster[x].Name,
							Position: user.roster[x].Position,
							Rating: user.roster[x].Rating,
							Shooting: user.roster[x].Shooting,
							Defending: user.roster[x].Defending,
							Dribbling: user.roster[x].Dribbling,
							Phyiscality: user.roster[x].Phyiscality,
							Passing: user.roster[x].Passing,
							Popularity: user.roster[x].Popularity,
							Club: user.roster[x].Club,
							Country: user.roster[x].Country,
						});
					}
				}
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.centerrb) {
						user.pldefender.push({
							Name: user.roster[x].Name,
							Position: user.roster[x].Position,
							Rating: user.roster[x].Rating,
							Shooting: user.roster[x].Shooting,
							Defending: user.roster[x].Defending,
							Dribbling: user.roster[x].Dribbling,
							Phyiscality: user.roster[x].Phyiscality,
							Passing: user.roster[x].Passing,
							Popularity: user.roster[x].Popularity,
							Club: user.roster[x].Club,
							Country: user.roster[x].Country,
						});
					}
				}
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.centerlb) {
						user.pldefender.push({
							Name: user.roster[x].Name,
							Position: user.roster[x].Position,
							Rating: user.roster[x].Rating,
							Shooting: user.roster[x].Shooting,
							Defending: user.roster[x].Defending,
							Dribbling: user.roster[x].Dribbling,
							Phyiscality: user.roster[x].Phyiscality,
							Passing: user.roster[x].Passing,
							Popularity: user.roster[x].Popularity,
							Club: user.roster[x].Club,
							Country: user.roster[x].Country,
						});
					}
				}
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.gk) {
						user.plgk.push({
							Name: user.roster[x].Name,
							Position: user.roster[x].Position,
							Rating: user.roster[x].Rating,
							Shooting: user.roster[x].Shooting,
							Defending: user.roster[x].Defending,
							Dribbling: user.roster[x].Dribbling,
							Phyiscality: user.roster[x].Phyiscality,
							Passing: user.roster[x].Passing,
							Popularity: user.roster[x].Popularity,
							Club: user.roster[x].Club,
							Country: user.roster[x].Country,
						});
					}
				}
			} else {
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.forward) {
						user.plforward.push({
							Name: user.roster[x].Name,
							Position: user.roster[x].Position,
							Rating: user.roster[x].Rating,
							Shooting: user.roster[x].Shooting,
							Defending: user.roster[x].Defending,
							Dribbling: user.roster[x].Dribbling,
							Phyiscality: user.roster[x].Phyiscality,
							Passing: user.roster[x].Passing,
							Popularity: user.roster[x].Popularity,
							Club: user.roster[x].Club,
							Country: user.roster[x].Country,
						});
						user.plforward = user.plforward.slice(user.plforward.length - 1, user.plforward.length);
					}
				}
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.rightw) {
						user.plmidfield.push({
							Name: user.roster[x].Name,
							Position: user.roster[x].Position,
							Rating: user.roster[x].Rating,
							Shooting: user.roster[x].Shooting,
							Defending: user.roster[x].Defending,
							Dribbling: user.roster[x].Dribbling,
							Phyiscality: user.roster[x].Phyiscality,
							Passing: user.roster[x].Passing,
							Popularity: user.roster[x].Popularity,
							Club: user.roster[x].Club,
							Country: user.roster[x].Country,
						});
						user.plmidfield = user.plmidfield.slice(user.plmidfield.length - 5, user.plmidfield.length);
					}
				}
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.leftw) {
						user.plmidfield.push({
							Name: user.roster[x].Name,
							Position: user.roster[x].Position,
							Rating: user.roster[x].Rating,
							Shooting: user.roster[x].Shooting,
							Defending: user.roster[x].Defending,
							Dribbling: user.roster[x].Dribbling,
							Phyiscality: user.roster[x].Phyiscality,
							Passing: user.roster[x].Passing,
							Popularity: user.roster[x].Popularity,
							Club: user.roster[x].Club,
							Country: user.roster[x].Country,
						});
						user.plmidfield = user.plmidfield.slice(user.plmidfield.length - 5, user.plmidfield.length);
					}
				}
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.leftm) {
						user.plmidfield.push({
							Name: user.roster[x].Name,
							Position: user.roster[x].Position,
							Rating: user.roster[x].Rating,
							Shooting: user.roster[x].Shooting,
							Defending: user.roster[x].Defending,
							Dribbling: user.roster[x].Dribbling,
							Phyiscality: user.roster[x].Phyiscality,
							Passing: user.roster[x].Passing,
							Popularity: user.roster[x].Popularity,
							Club: user.roster[x].Club,
							Country: user.roster[x].Country,
						});
						user.plmidfield = user.plmidfield.slice(user.plmidfield.length - 5, user.plmidfield.length);
					}
				}
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.rightm) {
						user.plmidfield.push({
							Name: user.roster[x].Name,
							Position: user.roster[x].Position,
							Rating: user.roster[x].Rating,
							Shooting: user.roster[x].Shooting,
							Defending: user.roster[x].Defending,
							Dribbling: user.roster[x].Dribbling,
							Phyiscality: user.roster[x].Phyiscality,
							Passing: user.roster[x].Passing,
							Popularity: user.roster[x].Popularity,
							Club: user.roster[x].Club,
							Country: user.roster[x].Country,
						});
						user.plmidfield = user.plmidfield.slice(user.plmidfield.length - 5, user.plmidfield.length);
					}
				}
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.centerm) {
						user.plmidfield.push({
							Name: user.roster[x].Name,
							Position: user.roster[x].Position,
							Rating: user.roster[x].Rating,
							Shooting: user.roster[x].Shooting,
							Defending: user.roster[x].Defending,
							Dribbling: user.roster[x].Dribbling,
							Phyiscality: user.roster[x].Phyiscality,
							Passing: user.roster[x].Passing,
							Popularity: user.roster[x].Popularity,
							Club: user.roster[x].Club,
							Country: user.roster[x].Country,
						});
						user.plmidfield = user.plmidfield.slice(user.plmidfield.length - 5, user.plmidfield.length);
					}
				}
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.leftb) {
						user.pldefender.push({
							Name: user.roster[x].Name,
							Position: user.roster[x].Position,
							Rating: user.roster[x].Rating,
							Shooting: user.roster[x].Shooting,
							Defending: user.roster[x].Defending,
							Dribbling: user.roster[x].Dribbling,
							Phyiscality: user.roster[x].Phyiscality,
							Passing: user.roster[x].Passing,
							Popularity: user.roster[x].Popularity,
							Club: user.roster[x].Club,
							Country: user.roster[x].Country,
						});
						user.pldefender = user.pldefender.slice(user.pldefender.length - 4, user.pldefender.length);
					}
				}
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.rightb) {
						user.pldefender.push({
							Name: user.roster[x].Name,
							Position: user.roster[x].Position,
							Rating: user.roster[x].Rating,
							Shooting: user.roster[x].Shooting,
							Defending: user.roster[x].Defending,
							Dribbling: user.roster[x].Dribbling,
							Phyiscality: user.roster[x].Phyiscality,
							Passing: user.roster[x].Passing,
							Popularity: user.roster[x].Popularity,
							Club: user.roster[x].Club,
							Country: user.roster[x].Country,
						});
						user.pldefender = user.pldefender.slice(user.pldefender.length - 4, user.pldefender.length);
					}
				}
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.centerrb) {
						user.pldefender.push({
							Name: user.roster[x].Name,
							Position: user.roster[x].Position,
							Rating: user.roster[x].Rating,
							Shooting: user.roster[x].Shooting,
							Defending: user.roster[x].Defending,
							Dribbling: user.roster[x].Dribbling,
							Phyiscality: user.roster[x].Phyiscality,
							Passing: user.roster[x].Passing,
							Popularity: user.roster[x].Popularity,
							Club: user.roster[x].Club,
							Country: user.roster[x].Country,
						});
						user.pldefender = user.pldefender.slice(user.pldefender.length - 4, user.pldefender.length);
					}
				}
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.centerlb) {
						user.pldefender.push({
							Name: user.roster[x].Name,
							Position: user.roster[x].Position,
							Rating: user.roster[x].Rating,
							Shooting: user.roster[x].Shooting,
							Defending: user.roster[x].Defending,
							Dribbling: user.roster[x].Dribbling,
							Phyiscality: user.roster[x].Phyiscality,
							Passing: user.roster[x].Passing,
							Popularity: user.roster[x].Popularity,
							Club: user.roster[x].Club,
							Country: user.roster[x].Country,
						});
						user.pldefender = user.pldefender.slice(user.pldefender.length - 4, user.pldefender.length);
					}
				}
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.gk) {
						user.plgk.push({
							Name: user.roster[x].Name,
							Position: user.roster[x].Position,
							Rating: user.roster[x].Rating,
							Shooting: user.roster[x].Shooting,
							Defending: user.roster[x].Defending,
							Dribbling: user.roster[x].Dribbling,
							Phyiscality: user.roster[x].Phyiscality,
							Passing: user.roster[x].Passing,
							Popularity: user.roster[x].Popularity,
							Club: user.roster[x].Club,
							Country: user.roster[x].Country,
						});
						user.plgk = user.plgk.slice(user.plgk.length - 1, user.plgk.length);
					}
				}
			}
			user.save()
				.then(console.log('team inserted'))
				.catch((e) => console.log(e));
		} else {
			console.log(err);
		}
		res.redirect('/dashboard');
	});
});

////////////////////////////////////////////////route for the forward transfer type/////////////////////////////////////////
router.get('/transfer/forward', ensureAuthenticated, (req, res) => {
	player.find({$or: [{Position: 'ST'}, {Position: 'CF'}, {Position: 'LF'}, {Position: 'RF'}]}, (err, player) => {
		if (!err) {
			res.render('forward', {
				user: req.user,
				player: player,
			});
		} else {
			console.log(err);
		}
	});
});

////////////////////////////////////////////////handling buying forwards///////////////////////////////////////////////////////////////
router.post('/transfer/forward', ensureAuthenticated, (req, res) => {
	User.findOne({name: req.body.user}, (err, user) => {
		var price = req.body.price;
		if (price[price.length - 1] == 'M') {
			var num = parseFloat(price.slice(0, price.length - 1));
			var result = num * 1000000;
		} else if (price[price.length - 1] == 'K') {
			var num = parseFloat(price.slice(0, price.length - 1));
			var result = num * 1000;
		} else {
			var num = parseFloat(price.slice(0, price.length));
			var result = num;
		}
		var budget = user.transfer - result;
		if (budget < 0) {
			res.render('fail');
		} else {
			if (!err) {
				var z = 0;
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.name) {
						z += 1;
					}
				}
				if (z == 0) {
					user.roster.push({
						Name: req.body.name,
						Position: req.body.position,
						Rating: req.body.rating,
						Shooting: req.body.shooting,
						Defending: req.body.defending,
						Dribbling: req.body.dribbling,
						Phyiscality: req.body.physical,
						Passing: req.body.passing,
						Popularity: req.body.popularity,
						Club: req.body.club,
						Country: req.body.country,
					});
					user.save((err) => {
						if (err) {
							console.log(err);
						}
					});
					User.findOneAndUpdate(
						{name: req.body.user},
						{transfer: budget},
						{useFindAndModify: false},
						(e, res) => {
							if (!e) {
								res.save()
									.then(console.log('forward purchased'))
									.catch((error) => console.log(error));
							}
						}
					);
				}
			} else {
				console.log(err);
			}
			res.redirect('/dashboard');
		}
	});
});

/////////////////////////////////////////////route for midfielder///////////////////////////////
router.get('/transfer/midfield', ensureAuthenticated, (req, res) => {
	player.find(
		{
			$or: [
				{Position: 'CAM'},
				{Position: 'LW'},
				{Position: 'RW'},
				{Position: 'RM'},
				{Position: 'LM'},
				{Position: 'CM'},
			],
		},
		(err, player) => {
			if (!err) {
				res.render('midfield', {
					user: req.user,
					player: player,
				});
			} else {
				console.log(err);
			}
		}
	);
});

///////////////////////////////////buying midfielders//////////////////////////////////////
router.post('/transfer/midfield', ensureAuthenticated, (req, res) => {
	User.findOne({name: req.body.user}, (err, user) => {
		var price = req.body.price;
		if (price[price.length - 1] == 'M') {
			var num = parseFloat(price.slice(0, price.length - 1));
			var result = num * 1000000;
		} else if (price[price.length - 1] == 'K') {
			var num = parseFloat(price.slice(0, price.length - 1));
			var result = num * 1000;
		} else {
			var num = parseFloat(price.slice(0, price.length));
			var result = num;
		}
		var budget = user.transfer - result;
		if (budget < 0) {
			res.render('fail');
		} else {
			if (!err) {
				var z = 0;
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.name) {
						z += 1;
					}
				}
				if (z == 0) {
					user.roster.push({
						Name: req.body.name,
						Position: req.body.position,
						Rating: req.body.rating,
						Shooting: req.body.shooting,
						Defending: req.body.defending,
						Dribbling: req.body.dribbling,
						Phyiscality: req.body.physical,
						Passing: req.body.passing,
						Popularity: req.body.popularity,
						Club: req.body.club,
						Country: req.body.country,
					});
					user.save((err) => {
						if (err) {
							console.log(err);
						}
					});
					User.findOneAndUpdate(
						{name: req.body.user},
						{transfer: budget},
						{useFindAndModify: false},
						(e, res) => {
							if (!e) {
								res.save()
									.then(console.log('midfielder done g'))
									.catch((error) => console.log(error));
							}
						}
					);
				}
			} else {
				console.log(err);
			}
			res.redirect('/dashboard');
		}
	});
});

//////////////////////////////////////////////////////route for defender////////////////////////////////
router.get('/transfer/defender', ensureAuthenticated, (req, res) => {
	player.find(
		{
			$or: [
				{Position: 'CDM'},
				{Position: 'LWB'},
				{Position: 'RWB'},
				{Position: 'RB'},
				{Position: 'LB'},
				{Position: 'CB'},
			],
		},
		(err, player) => {
			if (!err) {
				res.render('defender', {
					user: req.user,
					player: player,
				});
			} else {
				console.log(err);
			}
		}
	);
});

///////////////////////////////////////////////////////////buying defenders//////////////////////////////////////////////////////////////////////

router.post('/transfer/defender', ensureAuthenticated, (req, res) => {
	User.findOne({name: req.body.user}, (err, user) => {
		var price = req.body.price;
		if (price[price.length - 1] == 'M') {
			var num = parseFloat(price.slice(0, price.length - 1));
			var result = num * 1000000;
		} else if (price[price.length - 1] == 'K') {
			var num = parseFloat(price.slice(0, price.length - 1));
			var result = num * 1000;
		} else {
			var num = parseFloat(price.slice(0, price.length));
			var result = num;
		}
		var budget = user.transfer - result;
		if (budget < 0) {
			res.render('fail');
		} else {
			if (!err) {
				var z = 0;
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.name) {
						z += 1;
					}
				}
				if (z == 0) {
					user.roster.push({
						Name: req.body.name,
						Position: req.body.position,
						Rating: req.body.rating,
						Shooting: req.body.shooting,
						Defending: req.body.defending,
						Dribbling: req.body.dribbling,
						Phyiscality: req.body.physical,
						Passing: req.body.passing,
						Popularity: req.body.popularity,
						Club: req.body.club,
						Country: req.body.country,
					});
					user.save((err) => {
						if (err) {
							console.log(err);
						}
					});
					User.findOneAndUpdate(
						{name: req.body.user},
						{transfer: budget},
						{useFindAndModify: false},
						(e, res) => {
							if (!e) {
								res.save()
									.then(console.log('defender done g'))
									.catch((error) => console.log(error));
							}
						}
					);
				}
			} else {
				console.log(err);
			}
			res.redirect('/dashboard');
		}
	});
});

////////////////////////////////////////////////////////route of keeper//////////////////////////////////////////////////////////////
router.get('/transfer/keeper', ensureAuthenticated, (req, res) => {
	player.find({Position: 'GK'}, (err, player) => {
		if (!err) {
			res.render('keeper', {
				user: req.user,
				player: player,
			});
		} else {
			console.log(err);
		}
	});
});

/////////////////////////////////////////////////////////////buying keeper//////////////////////////////////////////
router.post('/transfer/keeper', ensureAuthenticated, (req, res) => {
	User.findOne({name: req.body.user}, (err, user) => {
		var price = req.body.price;
		if (price[price.length - 1] == 'M') {
			var num = parseFloat(price.slice(0, price.length - 1));
			var result = num * 1000000;
		} else if (price[price.length - 1] == 'K') {
			var num = parseFloat(price.slice(0, price.length - 1));
			var result = num * 1000;
		} else {
			var num = parseFloat(price.slice(0, price.length));
			var result = num;
		}
		var budget = user.transfer - result;
		if (budget < 0) {
			res.render('fail');
		} else {
			if (!err) {
				var z = 0;
				for (x = 0; x < user.roster.length; x++) {
					if (user.roster[x].Name == req.body.name) {
						z += 1;
					}
				}
				if (z == 0) {
					user.roster.push({
						Name: req.body.name,
						Position: req.body.position,
						Rating: req.body.rating,
						Shooting: req.body.shooting,
						Defending: req.body.defending,
						Dribbling: req.body.dribbling,
						Phyiscality: req.body.physical,
						Passing: req.body.passing,
						Popularity: req.body.popularity,
						Club: req.body.club,
						Country: req.body.country,
					});
					user.save((err) => {
						if (err) {
							console.log(err);
						}
					});
					User.findOneAndUpdate(
						{name: req.body.user},
						{transfer: budget},
						{useFindAndModify: false},
						(e, res) => {
							if (!e) {
								res.save()
									.then(console.log('keeper done g'))
									.catch((error) => console.log(error));
							}
						}
					);
				}
			} else {
				console.log(err);
			}
			res.redirect('/dashboard');
		}
	});
});

module.exports = router;
