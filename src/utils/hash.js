const crypto = require('crypto');

const genRandomSalt = (length=12) => {
  return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
};
const sha512 = (valueToHash, salt='') => {
  if (!salt) salt = genRandomSalt();
  let hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(valueToHash);
  let hashedValue = hash.digest('hex');
  return {
      salt: salt,
      hash: hashedValue,
  };
};

const compare = (value, salt, hashedValue) => {
  const valueToCompare = sha512(value, salt);
  return valueToCompare.hash === hashedValue;
};

module.exports = {
  compare,
  sha512,
  genRandomSalt,
};
