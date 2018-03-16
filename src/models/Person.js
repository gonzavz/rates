const mongoose = require('mongoose');
const Hash = require('../utils/hash');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    title: {type: String},
    name: {
      type: Schema.Types.String,
    },
    surname: {
      type: Schema.Types.String,
    },
    username: {
      type: Schema.Types.String,
      unique: true,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
  });

// ensure to encrypt password before save
PersonSchema.pre('save', function(next) {
  const person = this;
  // only hash the password if it has been modified (or is new)
  if (!person.isModified('password')) return next();
  // generate a salt
  const {salt, hash} = Hash.sha512(person.password);
  person.password = `${salt}_${hash}`;
  next();
});

PersonSchema.methods.comparePassword = function(candidatePassword) {
  const person = this;
  [salt, hash] = person.password.split('_');
  const candidateHash = Hash.sha512(candidatePassword, salt);
  if (hash !== candidateHash.hash) {
    throw new Error('Invalid credentials');
  }
};

const Person = mongoose.model('Person', PersonSchema);
module.exports = Person;
