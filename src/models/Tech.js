const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validUses = [
  'devops',
  'management',
  'ui',
  'ux',
  'management',
  'frontend',
  'backend',
  'database',
  'mobile',
  'webmobile',
];

const validTypes = [
  'language',
  'framework',
  'vcs',
  'message_broker',
  'in_memory_db',
  'db',
  'app',
];

const TechSchema = new Schema({
    name: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    type: {
      type: Schema.Types.String,
      enum: validTypes,
    },
    apply: [{
      type: Schema.Types.String,
      enum: validUses,
    }],
  });

const Tech = mongoose.model('Tech', TechSchema);
module.exports = Tech;
