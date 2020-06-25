const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const player = require('../models/Player');
const User = require('../models/User');


// Dashboard
router.get('/player', ensureAuthenticated, (req, res) => {
    player.find({}, function(err, player) {
        if (!err) {
            res.render('player', {
                user: req.user,
                player: player,
            })
        } else {
            console.log(err);
        }
    })

});

router.get('/transfer/forward', ensureAuthenticated, (req, res) => {
    player.find({ $or: [{ POSITION: 'ST' }, { POSITION: 'CF' }] }, (err, player) => {
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
        var budget = user.transfer - req.body.cost;
        if (budget < 0) {
            res.render('fail')
        } else {
            if (!err) {
                user.roster.push({ NAME: req.body.name, POSITION: req.body.position, RATING: req.body.rating, SHOOTING: req.body.shooting, DEFENDING: req.body.defending, DRIBBLING: req.body.dribbling, PHYSICAL: req.body.physical, PASSING: req.body.passing });
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

module.exports = router;