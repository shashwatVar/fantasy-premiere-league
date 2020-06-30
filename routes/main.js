const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const player = require('../models/Player');
const User = require('../models/User');


// Dashboard
router.get('/player', ensureAuthenticated, (req, res) => {
    res.render('player', {
        user: req.user,
    })
});

router.post('/player', ensureAuthenticated, (req, res) => {
    res.render('player', {
        user: req.user,
    })
});

router.get('/transfer/forward', ensureAuthenticated, (req, res) => {
    player.find({ $or: [{ Position: 'ST' }, { Position: 'CF' }, { Position: 'LF' }, { Position: 'RF' }] }, (err, player) => {
        if (!err) {
            res.render('forward', {
                user: req.user,
                player: player,
            })
        } else {
            console.log(err);
        }
    })
});

router.post('/transfer/forward', ensureAuthenticated, (req, res) => {
    User.findOne({ name: req.body.user }, (err, user) => {
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
            res.render('fail')
        } else {
            if (!err) {
                user.roster.push({ Name: req.body.name, Position: req.body.position, Rating: req.body.rating, Shooting: req.body.shooting, Defending: req.body.defending, Dribbling: req.body.dribbling, Phyiscality: req.body.physical, Passing: req.body.passing, Popularity: req.body.popularity, Club: req.body.club, Country: req.body.country });
                user.save((err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                User.findOneAndUpdate({ name: req.body.user }, { transfer: budget }, { useFindAndModify: false }, (e, res) => {
                    if (!e) {
                        res.save()
                    }
                })
            } else {
                console.log(err)
            }
            res.redirect('/player/transfer/forward');
        }
    });

});

router.get('/transfer/midfield', ensureAuthenticated, (req, res) => {
    player.find({ $or: [{ Position: 'CAM' }, { Position: 'LW' }, { Position: 'RW' }, { Position: 'RM' }, { Position: 'LM' }, { Position: 'CM' }] }, (err, player) => {
        if (!err) {
            res.render('midfield', {
                user: req.user,
                player: player,
            })
        } else {
            console.log(err);
        }
    })
});

router.post('/transfer/midfield', ensureAuthenticated, (req, res) => {
    User.findOne({ name: req.body.user }, (err, user) => {
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
            res.render('fail')
        } else {
            if (!err) {
                user.roster.push({ Name: req.body.name, Position: req.body.position, Rating: req.body.rating, Shooting: req.body.shooting, Defending: req.body.defending, Dribbling: req.body.dribbling, Phyiscality: req.body.physical, Passing: req.body.passing, Popularity: req.body.popularity, Club: req.body.club, Country: req.body.country });
                user.save((err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                User.findOneAndUpdate({ name: req.body.user }, { transfer: budget }, { useFindAndModify: false }, (e, res) => {
                    if (!e) {
                        res.save()
                    }
                })
            } else {
                console.log(err)
            }
            res.redirect('/player/transfer/midfield');
        }
    });
});

router.get('/transfer/defender', ensureAuthenticated, (req, res) => {
    player.find({ $or: [{ Position: 'CDM' }, { Position: 'LWB' }, { Position: 'RWB' }, { Position: 'RB' }, { Position: 'LB' }, { Position: 'CB' }] }, (err, player) => {
        if (!err) {
            res.render('defender', {
                user: req.user,
                player: player,
            })
        } else {
            console.log(err);
        }
    })
});

router.post('/transfer/defender', ensureAuthenticated, (req, res) => {
    User.findOne({ name: req.body.user }, (err, user) => {
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
            res.render('fail')
        } else {
            if (!err) {
                user.roster.push({ Name: req.body.name, Position: req.body.position, Rating: req.body.rating, Shooting: req.body.shooting, Defending: req.body.defending, Dribbling: req.body.dribbling, Phyiscality: req.body.physical, Passing: req.body.passing, Popularity: req.body.popularity, Club: req.body.club, Country: req.body.country });
                user.save((err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                User.findOneAndUpdate({ name: req.body.user }, { transfer: budget }, { useFindAndModify: false }, (e, res) => {
                    if (!e) {
                        res.save()
                    }
                })
            } else {
                console.log(err)
            }
            res.redirect('/player/transfer/defender');
        }
    });

});

router.get('/transfer/keeper', ensureAuthenticated, (req, res) => {
    player.find({ Position: 'GK' }, (err, player) => {
        if (!err) {
            res.render('keeper', {
                user: req.user,
                player: player,
            })
        } else {
            console.log(err);
        }
    })
});

router.post('/transfer/keeper', ensureAuthenticated, (req, res) => {
    User.findOne({ name: req.body.user }, (err, user) => {
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
            res.render('fail')
        } else {
            if (!err) {
                user.roster.push({ Name: req.body.name, Position: req.body.position, Rating: req.body.rating, Shooting: req.body.shooting, Defending: req.body.defending, Dribbling: req.body.dribbling, Phyiscality: req.body.physical, Passing: req.body.passing, Popularity: req.body.popularity, Club: req.body.club, Country: req.body.country });
                user.save((err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                User.findOneAndUpdate({ name: req.body.user }, { transfer: budget }, { useFindAndModify: false }, (e, res) => {
                    if (!e) {
                        res.save()
                    }
                })
            } else {
                console.log(err)
            }
            res.redirect('/player/transfer/keeper');
        }
    });

});


module.exports = router;