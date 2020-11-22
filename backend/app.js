require('dotenv').config();

const express = require('express');
const _ = require('lodash');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const { User } = require('./models/user');
const passport = require('passport');

// Create express app
const app = express();
const PORT = process.env.PORT || 3001;
const router = express.Router();

// Middlewares
// app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// mongodb connection
mongoose.connect('mongodb://localhost:27017/bugTrackerDB', { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

// Routes
// const authRoutes = require('./routes/auth');
const bugRoutes = require('./routes/bug');

// Routes
// app.use('/api', authRoutes);
app.use('/api', bugRoutes);


router.post('/register', (req, res) => {
  User.register({ username: req.body.username }, req.body.password, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      passport.authenticate('local')(req, res, () => {
        res.send('You have been successfully registered');
        console.log(user);
      });
    }
  });
});

router.post('/login', (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, (err) => {
    if (err) {
      res.send(err);
    } else {
      passport.authenticate('local')(req, res, () => {
        res.send('You are logged in');
      });
    }
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.send('You are logged out');
});

app.use('/api', router);

// // / crud operations on all bugs ///
//
// app.route('/bug')
//
// });
// // / crud operations on specific bug ///
//
// app.route('/bug/:bugName')


app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
