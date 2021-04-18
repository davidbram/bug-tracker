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

// const DB_HOST = 'mongodb://localhost:27017/bugTrackerDB' 
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME; 
const DB_HOST = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.b9dyt.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`


// mongodb connection
mongoose.connect(DB_HOST, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

// Routes
// const authRoutes = require('./routes/auth');
const bugRoutes = require('./routes/bug');
const projectRoutes = require('./routes/project');

// Routes
// app.use('/api', authRoutes);
app.use('/api', bugRoutes);
app.use('/api', projectRoutes);


passport.use(User.createStrategy());
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


router.post('/register', (req, res) => {
  User.register({ username: req.body.username }, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      passport.authenticate('local')(req, res, () => {
        res.send('You have been successfully registered');
        console.log('User created');
        console.log(user);
      });
    }
  });
});

router.post('/login', (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, (err) => {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      passport.authenticate('local')(req, res, () => {
        console.log('inside authenticate');
        res.send('You are logged in');
        // res.redirect('/');
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
