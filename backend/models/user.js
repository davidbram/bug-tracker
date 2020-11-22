const mongoose = require('mongoose');

const passportLocalMongoose = require('passport-local-mongoose');

const findOrCreate = require('mongoose-findorcreate');

const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  secret: String,
  bugs: [{
    type: ObjectId,
    ref: 'Bug',
  }],
});

userSchema.plugin(passportLocalMongoose);

userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);

module.exports = { User };
