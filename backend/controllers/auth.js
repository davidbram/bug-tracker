const { User } = require('../models/user');

const passport = require('passport');

passport.use(User.createStrategy());
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


exports.registerUser = (req, res) => {
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
};

exports.loginUser = (req, res) => {
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
};

exports.logoutUser = (req, res) => {
  req.logout();
  res.send('You are logged out');
};

module.exports = { passport };
