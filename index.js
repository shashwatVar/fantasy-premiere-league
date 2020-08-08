const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const User = require('./models/User');
var schedule = require('node-schedule');


const app = express();


// Passport Config
require('./config/passport')(passport);



// DB Config
const db = require('./config/keys').mongoURI;


// Connect to Mongoose
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => {
        console.log('mongoose odm up and running!!')
    })
    .catch(err => console.log(err));




// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// Static
app.use(express.static(__dirname + '/styles'));


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/player', require('./routes/main.js'));




var job1 = schedule.scheduleJob({ hour: 9, minute: 45 }, function() {
    User.find({ ready: 'YES' }, (err, user) => {
        function shuffle(array) {
            var currentIndex = array.length,
                temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }
        user = shuffle(user);

        function recur(n) {
            User.findOne({ name: user[n - 1].name }, { useFindAndModify: false }, (e, u) => {
                if (!e) {

                    u.team.push({ name: user[n - 1].name, plforward: user[n - 1].plforward, plmidfield: user[n - 1].plmidfield, pldefender: user[n - 1].pldefender, plgk: user[n - 1].plgk });
                    u.team2.push({ name: user[n - 2].name, plforward: user[n - 2].plforward, plmidfield: user[n - 2].plmidfield, pldefender: user[n - 2].pldefender, plgk: user[n - 2].plgk });
                    if (u.team.length == 2) {
                        u.team2 = u.team2.slice(1);
                        u.team = u.team.slice(1);
                    }
                    u.save();
                } else {
                    console.log(e);
                }
            })
            User.findOne({ name: user[n - 2].name }, { useFindAndModify: false }, (e, u) => {
                if (!e) {
                    u.team.push({ name: user[n - 1].name, plforward: user[n - 1].plforward, plmidfield: user[n - 1].plmidfield, pldefender: user[n - 1].pldefender, plgk: user[n - 1].plgk });
                    u.team2.push({ name: user[n - 2].name, plforward: user[n - 2].plforward, plmidfield: user[n - 2].plmidfield, pldefender: user[n - 2].pldefender, plgk: user[n - 2].plgk });
                    if (u.team.length == 2) {
                        u.team2 = u.team2.slice(1);
                        u.team = u.team.slice(1);
                    }
                    u.save();
                } else {
                    console.log(e);
                }
            })

            if (n != 2) {
                recur(n - 2);
            }
        }

        if (user.length % 2 == 0) {
            recur(user.length);
        } else {
            recur(user.length - 1);
        }
    });
    console.log('matches decided');
});


var job2 = schedule.scheduleJob({ hour: 10, minute: 00 }, function() {
    User.find({ ready: 'YES' }, { useFindAndModify: false }, (e, u) => {
        if (!e) {
            var completed_array = []
            for (x = 0; x < u.length; x++) {
                if (u[x].team.length != 0) {
                    var defensive_rating = 0
                    var defensive_rating2 = 0
                    var attacking_rating = 0
                    var attacking_rating2 = 0
                    var Popularity_rating = 0
                    var Popularity_rating2 = 0
                    var midfield_at_rating = 0
                    var midfield_de_rating = 0
                    var midfield_de_rating2 = 0
                    var midfield_at_rating2 = 0
                    var net_attacking = 0
                    var net_defensive = 0
                    var net_attacking2 = 0
                    var net_defensive2 = 0
                    var team1 = 0
                    var team2 = 0
                    var gk_rating = 0
                    var gk_rating2 = 0
                    var goal1
                    var goal2
                    var hte
                    var ate
                    if (completed_array.includes(u[x].team[0].name) != true && completed_array.includes(u[x].team2[0].name) != true) {
                        completed_array.push(u[x].team[0].name);
                        completed_array.push(u[x].team2[0].name);

                        for (h = 0; h < u.length; h++) {
                            if (u[h].name == u[x].team[0].name) {
                                hte = h;
                            }
                        }

                        for (a = 0; a < u.length; a++) {
                            if (u[a].name == u[x].team2[0].name) {
                                ate = a;
                            }
                        }

                        attacking_rating += (u[x].team[0].plforward[0].Shooting + u[x].team[0].plforward[0].Phyiscality) * ((u[x].team[0].plforward[0].Morale) / 100);
                        attacking_rating2 += (u[x].team2[0].plforward[0].Shooting + u[x].team2[0].plforward[0].Phyiscality) * ((u[x].team2[0].plforward[0].Morale) / 100);
                        Popularity_rating += u[x].team[0].plforward[0].Popularity;
                        Popularity_rating2 += u[x].team2[0].plforward[0].Popularity;
                        Popularity_rating += u[x].team[0].plgk[0].Popularity;
                        Popularity_rating2 += u[x].team2[0].plgk[0].Popularity;

                        gk_rating += u[x].team[0].plgk[0].Rating;
                        gk_rating2 += u[x].team2[0].plgk[0].Rating;

                        for (j = 0; j < 5; j++) {
                            midfield_at_rating += (u[x].team[0].plmidfield[j].Shooting + u[x].team[0].plmidfield[j].Dribbling + u[x].team[0].plmidfield[j].Passing) * ((u[x].team[0].plmidfield[j].Morale) / 100);
                            midfield_at_rating2 += (u[x].team2[0].plmidfield[j].Shooting + u[x].team2[0].plmidfield[j].Dribbling + u[x].team2[0].plmidfield[j].Passing) * ((u[x].team2[0].plmidfield[j].Morale) / 100);
                            midfield_de_rating += (u[x].team[0].plmidfield[j].Defending) * ((u[x].team[0].plmidfield[j].Morale) / 100);
                            midfield_de_rating2 += (u[x].team2[0].plmidfield[j].Defending) * ((u[x].team2[0].plmidfield[j].Morale) / 100);
                            Popularity_rating += u[x].team[0].plmidfield[j].Popularity;
                            Popularity_rating2 += u[x].team2[0].plmidfield[j].Popularity;
                        }

                        for (j = 0; j < 4; j++) {
                            defensive_rating += (u[x].team[0].pldefender[j].Defending + u[x].team[0].pldefender[j].Phyiscality) * ((u[x].team[0].pldefender[j].Morale) / 100);
                            defensive_rating2 += (u[x].team2[0].pldefender[j].Defending + u[x].team2[0].pldefender[j].Phyiscality) * ((u[x].team2[0].pldefender[j].Morale) / 100);
                        }
                        defensive_rating += gk_rating;
                        defensive_rating2 += gk_rating2;

                        defensive_rating = defensive_rating / 9;
                        defensive_rating2 = defensive_rating2 / 9;
                        midfield_at_rating = midfield_at_rating / 15;
                        midfield_at_rating2 = midfield_at_rating2 / 15;
                        midfield_de_rating = midfield_de_rating / 5;
                        midfield_de_rating2 = midfield_de_rating2 / 5;
                        attacking_rating = attacking_rating / 2;
                        attacking_rating2 = attacking_rating2 / 2;
                        Popularity_rating = Popularity_rating / 11;
                        Popularity_rating2 = Popularity_rating2 / 11;

                        net_attacking = attacking_rating * 0.75 + midfield_at_rating * 0.25;
                        net_defensive = defensive_rating * 0.90 + midfield_de_rating * 0.10;
                        net_attacking2 = attacking_rating2 * 0.75 + midfield_at_rating2 * 0.25;
                        net_defensive2 = defensive_rating2 * 0.90 + midfield_de_rating2 * 0.10;

                        team1 += net_attacking - net_defensive2;
                        team2 += net_attacking2 - net_defensive;

                        if (team1 >= 0 && team1 < 2) {
                            goal1 = Math.floor(Math.random() * 2)
                        } else if (team1 > 0 && team1 < 10) {
                            var itr = Math.floor(team1 - 2);
                            var k = [0, 1, 2];
                            if (itr == 1) {
                                k.push(2);
                            }
                            if (itr == 2) {
                                k.push(2);
                                k.push(3);

                            }
                            if (itr == 3) {
                                k.push(2);
                                k.push(3);
                                k.push(3);
                            }
                            if (itr == 4) {
                                k.push(2);
                                k.push(3);
                                k.push(3);
                                k.push(3);
                            }
                            if (itr == 5) {
                                k.push(2);
                                k.push(3);
                                k.push(3);
                                k.push(3);
                                k.push(4);
                            }
                            if (itr == 6) {
                                k.push(2);
                                k.push(3);
                                k.push(3);
                                k.push(3);
                                k.push(4);
                                k.push(4);
                            }
                            if (itr == 7) {
                                k.push(2);
                                k.push(3);
                                k.push(3);
                                k.push(3);
                                k.push(4);
                                k.push(4);
                                k.push(4);
                            }
                            if (itr == 8) {
                                k.push(2);
                                k.push(3);
                                k.push(3);
                                k.push(3);
                                k.push(4);
                                k.push(4);
                                k.push(4);
                                k.push(4);
                            }
                            if (itr == 9) {
                                k.push(2);
                                k.push(3);
                                k.push(3);
                                k.push(3);
                                k.push(4);
                                k.push(4);
                                k.push(4);
                                k.push(4);
                            }
                            goal1 = k[Math.floor(Math.random() * (k.length - 1))];
                        } else if (team1 > 10) {
                            goal1 = Math.floor(Math.random() * (Math.floor(team1 / 2) - Math.floor(team1 / 6)) + Math.floor(team1 / 8));
                        } else if (team1 < 0 && team1 > -3) {
                            l = [0, 0, 0, 0, 1, 1, 1, 2, 2]
                            goal1 = l[Math.floor(Math.random() * (l.length - 1))];
                        } else {
                            var typ = Math.floor(team1);
                            var lin = [];
                            for (i = 0; i < typ + 1; i++) {
                                lin.push(0);
                            }
                            lin.push(1);
                            goal1 = lin[Math.floor(Math.random() * (lin.length - 1))];
                        }

                        if (team2 >= 0 && team2 < 2) {
                            goal2 = Math.floor(Math.random() * 2)
                        } else if (team2 > 0 && team2 < 10) {
                            var itr2 = Math.floor(team2 - 2);
                            var k2 = [0, 1, 2];
                            if (itr2 == 1) {
                                k2.push(2);
                            }
                            if (itr2 == 2) {
                                k2.push(2);
                                k2.push(3);

                            }
                            if (itr2 == 3) {
                                k2.push(2);
                                k2.push(3);
                                k2.push(3);
                            }
                            if (itr2 == 4) {
                                k2.push(2);
                                k2.push(3);
                                k2.push(3);
                                k2.push(3);
                            }
                            if (itr2 == 5) {
                                k2.push(2);
                                k2.push(3);
                                k2.push(3);
                                k2.push(3);
                                k2.push(4);
                            }
                            if (itr2 == 6) {
                                k2.push(2);
                                k2.push(3);
                                k2.push(3);
                                k2.push(3);
                                k2.push(4);
                                k2.push(4);
                            }
                            if (itr2 == 7) {
                                k2.push(2);
                                k2.push(3);
                                k2.push(3);
                                k2.push(3);
                                k2.push(4);
                                k2.push(4);
                                k2.push(4);
                            }
                            if (itr2 == 8) {
                                k2.push(2);
                                k2.push(3);
                                k2.push(3);
                                k2.push(3);
                                k2.push(4);
                                k2.push(4);
                                k2.push(4);
                                k2.push(4);
                            }
                            if (itr2 == 9) {
                                k2.push(2);
                                k2.push(3);
                                k2.push(3);
                                k2.push(3);
                                k2.push(4);
                                k2.push(4);
                                k2.push(4);
                                k2.push(4);
                            }
                            goal2 = k2[Math.floor(Math.random() * (k2.length - 1))];

                        } else if (team2 > 10) {
                            goal2 = Math.floor(Math.random() * (Math.floor(team2 / 2) - Math.floor(team2 / 6)) + Math.floor(team2 / 8));
                        } else if (team2 < 0 && team2 > -3) {
                            l2 = [0, 0, 0, 0, 1, 1, 1, 2, 2]
                            goal2 = l2[Math.floor(Math.random() * (l2.length - 1))];
                        } else {
                            var typ2 = Math.floor(team2);
                            var lin2 = [];
                            for (i = 0; i < typ2 + 1; i++) {
                                lin2.push(0);
                            }
                            lin2.push(1);
                            goal2 = lin2[Math.floor(Math.random() * (lin2.length - 1))];
                        }


                        var team_array_scorer = [];
                        var team_array_scorer2 = [];

                        if (u[x].team[0].plforward[0].Rating > 80 && u[x].team[0].plforward[0].Rating < 85) {
                            team_array_scorer.push(u[x].team[0].plforward[0].Name)
                            team_array_scorer.push(u[x].team[0].plforward[0].Name)
                            team_array_scorer.push(u[x].team[0].plforward[0].Name)
                            team_array_scorer.push(u[x].team[0].plforward[0].Name)
                        }
                        if (u[x].team[0].plforward[0].Rating < 80) {
                            team_array_scorer.push(u[x].team[0].plforward[0].Name)
                            team_array_scorer.push(u[x].team[0].plforward[0].Name)
                            team_array_scorer.push(u[x].team[0].plforward[0].Name)
                        }
                        if (u[x].team[0].plforward[0].Rating > 90) {
                            team_array_scorer.push(u[x].team[0].plforward[0].Name)
                            team_array_scorer.push(u[x].team[0].plforward[0].Name)
                            team_array_scorer.push(u[x].team[0].plforward[0].Name)
                            team_array_scorer.push(u[x].team[0].plforward[0].Name)
                            team_array_scorer.push(u[x].team[0].plforward[0].Name)
                        }

                        for (i = 0; i < 5; i++) {
                            if (u[x].team[0].plmidfield[i].Rating > 85) {
                                team_array_scorer.push(u[x].team[0].plmidfield[i].Name)
                                team_array_scorer.push(u[x].team[0].plmidfield[i].Name)
                                team_array_scorer.push(u[x].team[0].plmidfield[i].Name)
                                team_array_scorer.push(u[x].team[0].plmidfield[i].Name)
                            }
                            if (u[x].team[0].plmidfield[i].Rating >= 80 && u[x].team[0].plmidfield[i].Rating <= 85) {
                                team_array_scorer.push(u[x].team[0].plmidfield[i].Name)
                                team_array_scorer.push(u[x].team[0].plmidfield[i].Name)
                                team_array_scorer.push(u[x].team[0].plmidfield[i].Name)
                            }
                            if (u[x].team[0].plmidfield[i].Rating < 80) {
                                team_array_scorer.push(u[x].team[0].plmidfield[i].Name)
                                team_array_scorer.push(u[x].team[0].plmidfield[i].Name)

                            }
                        }

                        for (j = 0; j < 4; j++) {
                            team_array_scorer.push(u[x].team[0].pldefender[j].Name)
                        }

                        if (u[x].team2[0].plforward[0].Rating > 80 && u[x].team2[0].plforward[0].Rating < 85) {
                            team_array_scorer2.push(u[x].team2[0].plforward[0].Name)
                            team_array_scorer2.push(u[x].team2[0].plforward[0].Name)
                            team_array_scorer2.push(u[x].team2[0].plforward[0].Name)
                            team_array_scorer2.push(u[x].team2[0].plforward[0].Name)
                        }
                        if (u[x].team2[0].plforward[0].Rating < 80) {
                            team_array_scorer2.push(u[x].team2[0].plforward[0].Name)
                            team_array_scorer2.push(u[x].team2[0].plforward[0].Name)
                            team_array_scorer2.push(u[x].team2[0].plforward[0].Name)
                        }
                        if (u[x].team2[0].plforward[0].Rating > 90) {
                            team_array_scorer2.push(u[x].team2[0].plforward[0].Name)
                            team_array_scorer2.push(u[x].team2[0].plforward[0].Name)
                            team_array_scorer2.push(u[x].team2[0].plforward[0].Name)
                            team_array_scorer2.push(u[x].team2[0].plforward[0].Name)
                            team_array_scorer2.push(u[x].team2[0].plforward[0].Name)
                        }

                        for (i = 0; i < 5; i++) {
                            if (u[x].team2[0].plmidfield[i].Rating > 85) {
                                team_array_scorer2.push(u[x].team2[0].plmidfield[i].Name)
                                team_array_scorer2.push(u[x].team2[0].plmidfield[i].Name)
                                team_array_scorer2.push(u[x].team2[0].plmidfield[i].Name)
                                team_array_scorer2.push(u[x].team2[0].plmidfield[i].Name)
                            }
                            if (u[x].team2[0].plmidfield[i].Rating >= 80 && u[x].team2[0].plmidfield[i].Rating <= 85) {
                                team_array_scorer2.push(u[x].team2[0].plmidfield[i].Name)
                                team_array_scorer2.push(u[x].team2[0].plmidfield[i].Name)
                                team_array_scorer2.push(u[x].team2[0].plmidfield[i].Name)
                            }
                            if (u[x].team2[0].plmidfield[i].Rating < 80) {
                                team_array_scorer2.push(u[x].team2[0].plmidfield[i].Name)
                                team_array_scorer2.push(u[x].team2[0].plmidfield[i].Name)

                            }
                        }

                        for (j = 0; j < 4; j++) {
                            team_array_scorer2.push(u[x].team2[0].pldefender[j].Name)
                        }
                        var goal_scorer = [];
                        var goal_scorer2 = [];

                        for (k = 0; k < goal1; k++) {
                            goal_scorer.push(team_array_scorer[Math.floor(Math.random() * (team_array_scorer.length - 1))])
                        }

                        for (k = 0; k < goal2; k++) {
                            goal_scorer2.push(team_array_scorer2[Math.floor(Math.random() * (team_array_scorer2.length - 1))])
                        }

                        console.log(goal_scorer);
                        console.log(goal_scorer2);
                        console.log(`team1 ${goal1} vs ${goal2} team2`);

                        completed_array.push(u[x].team[0].name);
                        completed_array.push(u[x].team2[0].name);

                        var time1 = [];
                        var time2 = [];

                        if (goal_scorer.length != 0) {
                            for (q = 0; q < goal_scorer.length; q++) {
                                time1.push(Math.floor(Math.random() * 9))
                            }
                        }

                        if (goal_scorer2.length != 0) {
                            for (q = 0; q < goal_scorer2.length; q++) {
                                time2.push(Math.floor(Math.random() * 9))
                            }
                        }



                        console.log(time1);
                        console.log(time2);
                        u[ate].matches.push({ name1: u[x].team[0].name, name2: u[x].team2[0].name, score1: goal1, score2: goal2, team1scorer: goal_scorer, team2scorer: goal_scorer2, time1: time1, time2: time2 });
                        u[hte].matches.push({ name1: u[x].team[0].name, name2: u[x].team2[0].name, score1: goal1, score2: goal2, team1scorer: goal_scorer, team2scorer: goal_scorer2, time1: time1, time2: time2 });
                        u[ate].save();
                        u[hte].save();
                    }
                }
            }
        }
    });
    console.log('results decided');
});


var job3 = schedule.scheduleJob({ hour: 10, minute: 10 }, function() {
    var user_name = [];
    var user_wins = [];
    var user_draws = [];
    var user_loses = [];
    var user_games = [];
    User.find({}, { useFindAndModify: false }, (err, user) => {
        if (!err) {
            for (x = 0; x < user.length; x++) {
                user_name.push(user[x].name);
                user_games.push(user[x].matches.length);
                var wins = 0;
                var draws = 0;
                var loses = 0;
                for (i = 0; i < user[x].matches.length; i++) {
                    if (user[x].matches[i].name1 == user[x].name) {
                        if (user[x].matches[i].score1 > user[x].matches[i].score2) {
                            wins += 1;
                        } else if (user[x].matches[i].score1 == user[x].matches[i].score2) {
                            draws += 1;
                        } else {
                            loses += 1;
                        }

                    } else {
                        if (user[x].matches[i].score2 > user[x].matches[i].score1) {
                            wins += 1;
                        } else if (user[x].matches[i].score1 == user[x].matches[i].score2) {
                            draws += 1;
                        } else {
                            loses += 1;
                        }

                    }
                }
                user_wins.push(wins);
                user_draws.push(draws);
                user_loses.push(loses);
            }
            for (j = 0; j < user.length; j++) {
                user[j].leaderboard.push({ managers: user_name, wins: user_wins, draws: user_draws, loses: user_loses, games: user_games });
                user[j].save();
            }

        }
    });
})


var job4 = schedule.scheduleJob({ hour: 10, minute: 20 }, function() {
    User.find({ ready: 'YES' }, { useFindAndModify: false }, (e, u) => {
        if (!e) {
            for (x = 0; x < u.length; x++) {
                if (u[x].name == u[x].matches[(u[x].matches.length) - 1].name1) {
                    //for the defenders and gk
                    if (u[x].matches[(u[x].matches.length) - 1].score2 == 0) {
                        for (i = 0; i < 4; i++) {
                            for (j = 0; j < u[x].roster.length; j++) {
                                if (u[x].pldefender[i].Name == u[x].roster[j].Name) {
                                    u[x].roster[j].Morale = u[x].roster[j].Morale + 4;
                                }
                            }
                        }
                        for (i = 0; i < 5; i++) {
                            for (j = 0; j < u[x].roster.length; j++) {
                                if (u[x].plmidfield[i].Name == u[x].roster[j].Name) {
                                    u[x].roster[j].Morale = u[x].roster[j].Morale + 3;
                                }
                            }
                        }
                        for (j = 0; j < u[x].roster.length; j++) {
                            if (u[x].plgk[0].Name == u[x].roster[j].Name) {
                                u[x].roster[j].Morale = u[x].roster[j].Morale + 4;
                            }
                        }
                    } else if (u[x].matches[(u[x].matches.length) - 1].score2 <= 2) {
                        for (i = 0; i < 4; i++) {
                            for (j = 0; j < u[x].roster.length; j++) {
                                if (u[x].pldefender[i].Name == u[x].roster[j].Name) {
                                    u[x].roster[j].Morale = u[x].roster[j].Morale - 4;
                                }
                            }
                        }
                        for (i = 0; i < 5; i++) {
                            for (j = 0; j < u[x].roster.length; j++) {
                                if (u[x].plmidfield[i].Name == u[x].roster[j].Name) {
                                    u[x].roster[j].Morale = u[x].roster[j].Morale - 3;
                                }
                            }
                        }
                        for (j = 0; j < u[x].roster.length; j++) {
                            if (u[x].plgk[0].Name == u[x].roster[j].Name) {
                                u[x].roster[j].Morale = u[x].roster[j].Morale - 4;
                            }
                        }
                    } else if (u[x].matches[(u[x].matches.length) - 1].score2 > 2) {
                        for (i = 0; i < 4; i++) {
                            for (j = 0; j < u[x].roster.length; j++) {
                                if (u[x].pldefender[i].Name == u[x].roster[j].Name) {
                                    u[x].roster[j].Morale = u[x].roster[j].Morale - (u[x].matches[(u[x].matches.length) - 1].score2 - 2) * 4;
                                }
                            }
                        }
                        for (i = 0; i < 5; i++) {
                            for (j = 0; j < u[x].roster.length; j++) {
                                if (u[x].plmidfield[i].Name == u[x].roster[j].Name) {
                                    u[x].roster[j].Morale = u[x].roster[j].Morale - (u[x].matches[(u[x].matches.length) - 1].score2 - 2) * 3;
                                }
                            }
                        }
                        for (j = 0; j < u[x].roster.length; j++) {
                            if (u[x].plgk[0].Name == u[x].roster[j].Name) {
                                u[x].roster[j].Morale = u[x].roster[j].Morale - (u[x].matches[(u[x].matches.length) - 1].score2 - 2) * 4;
                            }
                        }
                    }
                    //for the attackers and midfielders
                    if (u[x].matches[(u[x].matches.length) - 1].score1 == 0) {
                        for (i = 0; i < 5; i++) {
                            for (j = 0; j < u[x].roster.length; j++) {
                                if (u[x].plmidfield[i].Name == u[x].roster[j].Name) {
                                    u[x].roster[j].Morale = u[x].roster[j].Morale - 3;
                                }
                            }
                        }
                        for (j = 0; j < u[x].roster.length; j++) {
                            if (u[x].plforward[0].Name == u[x].roster[j].Name) {
                                u[x].roster[j].Morale = u[x].roster[j].Morale - 4;
                            }
                        }

                    } else if (u[x].matches[(u[x].matches.length) - 1].score1 <= 2) {
                        for (i = 0; i < 5; i++) {
                            for (j = 0; j < u[x].roster.length; j++) {
                                if (u[x].plmidfield[i].Name == u[x].roster[j].Name) {
                                    u[x].roster[j].Morale = u[x].roster[j].Morale + 3;
                                }
                            }
                        }
                        for (j = 0; j < u[x].roster.length; j++) {
                            if (u[x].plforward[0].Name == u[x].roster[j].Name) {
                                u[x].roster[j].Morale = u[x].roster[j].Morale + 4;
                            }
                        }

                    } else if (u[x].matches[(u[x].matches.length) - 1].score1 > 2) {
                        for (i = 0; i < 5; i++) {
                            for (j = 0; j < u[x].roster.length; j++) {
                                if (u[x].plmidfield[i].Name == u[x].roster[j].Name) {
                                    u[x].roster[j].Morale = u[x].roster[j].Morale + (u[x].matches[(u[x].matches.length) - 1].score1 - 2) * 3;
                                }
                            }
                        }
                        for (j = 0; j < u[x].roster.length; j++) {
                            if (u[x].plforward[0].Name == u[x].roster[j].Name) {
                                u[x].roster[j].Morale = u[x].roster[j].Morale + (u[x].matches[(u[x].matches.length) - 1].score1 - 2) * 4;
                            }
                        }
                    }
                    //individual goal scorers
                    for (i = 0; i < u[x].matches[(u[x].matches.length) - 1].team1scorer.length; i++) {
                        for (j = 0; j < u[x].roster.length; j++) {
                            if (u[x].matches[(u[x].matches.length) - 1].team1scorer[i] == u[x].roster[j].Name) {
                                u[x].roster[j].Morale = u[x].roster[j].Morale + 5;
                            }
                        }
                    }

                } else {
                    //for the defenders and gk
                    if (u[x].matches[(u[x].matches.length) - 1].score1 == 0) {
                        for (i = 0; i < 4; i++) {
                            for (j = 0; j < u[x].roster.length; j++) {
                                if (u[x].pldefender[i].Name == u[x].roster[j].Name) {
                                    u[x].roster[j].Morale = u[x].roster[j].Morale + 4;
                                }
                            }
                        }
                        for (i = 0; i < 5; i++) {
                            for (j = 0; j < u[x].roster.length; j++) {
                                if (u[x].plmidfield[i].Name == u[x].roster[j].Name) {
                                    u[x].roster[j].Morale = u[x].roster[j].Morale + 3;
                                }
                            }
                        }
                        for (j = 0; j < u[x].roster.length; j++) {
                            if (u[x].plgk[0].Name == u[x].roster[j].Name) {
                                u[x].roster[j].Morale = u[x].roster[j].Morale + 4;
                            }
                        }
                    } else if (u[x].matches[(u[x].matches.length) - 1].score1 <= 2) {
                        for (i = 0; i < 4; i++) {
                            for (j = 0; j < u[x].roster.length; j++) {
                                if (u[x].pldefender[i].Name == u[x].roster[j].Name) {
                                    u[x].roster[j].Morale = u[x].roster[j].Morale - 4;
                                }
                            }
                        }
                        for (i = 0; i < 5; i++) {
                            for (j = 0; j < u[x].roster.length; j++) {
                                if (u[x].plmidfield[i].Name == u[x].roster[j].Name) {
                                    u[x].roster[j].Morale = u[x].roster[j].Morale - 3;
                                }
                            }
                        }
                        for (j = 0; j < u[x].roster.length; j++) {
                            if (u[x].plgk[0].Name == u[x].roster[j].Name) {
                                u[x].roster[j].Morale = u[x].roster[j].Morale - 4;
                            }
                        }
                    } else if (u[x].matches[(u[x].matches.length) - 1].score1 > 2) {
                        for (i = 0; i < 4; i++) {
                            for (j = 0; j < u[x].roster.length; j++) {
                                if (u[x].pldefender[i].Name == u[x].roster[j].Name) {
                                    u[x].roster[j].Morale = u[x].roster[j].Morale - (u[x].matches[(u[x].matches.length) - 1].score1 - 2) * 4;
                                }
                            }
                        }
                        for (i = 0; i < 5; i++) {
                            for (j = 0; j < u[x].roster.length; j++) {
                                if (u[x].plmidfield[i].Name == u[x].roster[j].Name) {
                                    u[x].roster[j].Morale = u[x].roster[j].Morale - (u[x].matches[(u[x].matches.length) - 1].score1 - 2) * 3;
                                }
                            }
                        }
                        for (j = 0; j < u[x].roster.length; j++) {
                            if (u[x].plgk[0].Name == u[x].roster[j].Name) {
                                u[x].roster[j].Morale = u[x].roster[j].Morale - (u[x].matches[(u[x].matches.length) - 1].score1 - 2) * 4;
                            }
                        }
                    }
                    //for the attackers and midfielders
                    if (u[x].matches[(u[x].matches.length) - 1].score2 == 0) {
                        for (i = 0; i < 5; i++) {
                            for (j = 0; j < u[x].roster.length; j++) {
                                if (u[x].plmidfield[i].Name == u[x].roster[j].Name) {
                                    u[x].roster[j].Morale = u[x].roster[j].Morale - 3;
                                }
                            }
                        }
                        for (j = 0; j < u[x].roster.length; j++) {
                            if (u[x].plforward[0].Name == u[x].roster[j].Name) {
                                u[x].roster[j].Morale = u[x].roster[j].Morale - 4;
                            }
                        }

                    } else if (u[x].matches[(u[x].matches.length) - 1].score2 <= 2) {
                        for (i = 0; i < 5; i++) {
                            for (j = 0; j < u[x].roster.length; j++) {
                                if (u[x].plmidfield[i].Name == u[x].roster[j].Name) {
                                    u[x].roster[j].Morale = u[x].roster[j].Morale + 3;
                                }
                            }
                        }
                        for (j = 0; j < u[x].roster.length; j++) {
                            if (u[x].plforward[0].Name == u[x].roster[j].Name) {
                                u[x].roster[j].Morale = u[x].roster[j].Morale + 4;
                            }
                        }

                    } else if (u[x].matches[(u[x].matches.length) - 1].score2 > 2) {
                        for (i = 0; i < 5; i++) {
                            for (j = 0; j < u[x].roster.length; j++) {
                                if (u[x].plmidfield[i].Name == u[x].roster[j].Name) {
                                    u[x].roster[j].Morale = u[x].roster[j].Morale + (u[x].matches[(u[x].matches.length) - 1].score2 - 2) * 3;
                                }
                            }
                        }
                        for (j = 0; j < u[x].roster.length; j++) {
                            if (u[x].plforward[0].Name == u[x].roster[j].Name) {
                                u[x].roster[j].Morale = u[x].roster[j].Morale + (u[x].matches[(u[x].matches.length) - 1].score2 - 2) * 4;
                            }
                        }
                    }
                    //individual goal scorers
                    for (i = 0; i < u[x].matches[(u[x].matches.length) - 1].team2scorer.length; i++) {
                        for (j = 0; j < u[x].roster.length; j++) {
                            if (u[x].matches[(u[x].matches.length) - 1].team2scorer[i] == u[x].roster[j].Name) {
                                u[x].roster[j].Morale = u[x].roster[j].Morale + 5;
                            }
                        }
                    }
                }
                u[x].save();
            }
        }
    });
    console.log('morale updated');
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});