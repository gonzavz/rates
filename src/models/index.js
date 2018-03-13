const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);
const models = [];

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0)
      && (file !== basename)
      && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const modelName = file.split('.')[0];
    models[modelName] = require(`./${file}`);
  });

module.exports = models;
