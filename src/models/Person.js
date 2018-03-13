const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    title: {type: String},
    name: {
      type: Schema.Types.String,
    },
    surname: {
      type: Schema.Types.String,
    },
  });

const Person = mongoose.model('Person', PersonSchema);
module.exports = Person;
