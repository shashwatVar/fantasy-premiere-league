const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const player = require('../models/Player');



// Dashboard
router.get('/player', ensureAuthenticated, (req, res) => {
    player.findOne({ NAME: 'Ronaldo' }, function(err, player) {
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

module.exports = router;