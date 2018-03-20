const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validUses = [
  'devops',
  'develop',
  'ui',
  'ux',
  'management',
  'frontend',
  'backend',
  'database',
];

const TechSchema = new Schema({
    name: {
      type: String,
      unique: true,
    },
    use: [{
      type: Schema.Types.String,
      enum: validUses,
    }],
  });

const Tech = mongoose.model('Tech', TechSchema);
module.exports = Tech;
