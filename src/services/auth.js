const models = require('../models');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SERVER_SECRET;

const authenticate = async (req, res, next) => {
  req.authorization = null;
  if(req.headers.authorization) {
    const token = req.headers.authorization;
    try {
      // extract the user id from the payload, if it is a valid one.
      const {id} = jwt.verify(token, SECRET);
      const person = await models.Person.findOne({_id: id});
      req.authorization = {token, person};
    } catch(error) {
      req.authorization = null;
    }
  }
  next();
};

const login = async ({username, password}) => {
  const person = await models.Person.findOne({username});
  if (person == null) {
    throw new Error('Invalid Username/Password!');
  }
  person.comparePassword(password)
  const token = jwt.sign({id: person.id}, SECRET, {expiresIn: '7d'})
  return {token, person}
};

const register = async ({username, password}) => {
  const person = await models.Person.create({username, password});
  const token = jwt.sign({id: person.id}, SECRET, {expiresIn: '7d'})
  return {token, person}
};

module.exports = {
  authenticate,
  login,
  register,
};
