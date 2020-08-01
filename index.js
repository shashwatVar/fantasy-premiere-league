const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const User = require('./models/User');



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

//setInterval(function() {
User.find({ ready: 'YES' }, (err, user) => {
    if (user.length > 0) {
        for (x = 0; x < user.length; x++) {
            if (x % 2 == 0) {}
        }
        User.findOne({ name: user[2].name }, { useFindAndModify: false }, (e, u) => {
            if (!e) {
                u.team.push({ name: user[2].name, plforward: user[2].plforward, plmidfield: user[2].plmidfield, pldefender: user[2].pldefender, plgk: user[2].plgk });
                u.team2.push({ name: user[3].name, plforward: user[3].plforward, plmidfield: user[3].plmidfield, pldefender: user[3].pldefender, plgk: user[3].plgk });
                if (u.team.length == 2) {
                    u.team2 = u.team2.slice(1);
                    u.team = u.team.slice(1);
                }
                u.save();
            } else {
                console.log(e);
            }
        })
        User.findOne({ name: user[3].name }, { useFindAndModify: false }, (e, u) => {
            if (!e) {
                u.team.push({ name: user[2].name, plforward: user[2].plforward, plmidfield: user[2].plmidfield, pldefender: user[2].pldefender, plgk: user[2].plgk });
                u.team2.push({ name: user[3].name, plforward: user[3].plforward, plmidfield: user[3].plmidfield, pldefender: user[3].pldefender, plgk: user[3].plgk });
                if (u.team.length == 2) {
                    u.team2 = u.team2.slice(1);
                    u.team = u.team.slice(1);
                }
                u.save();
            } else {
                console.log(e);
            }
        })
    };
});

//}, 1000);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});