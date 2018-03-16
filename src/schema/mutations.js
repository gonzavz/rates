const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID} = graphql;
const PersonType = require('./personType');
const AuthType = require('./authType');
const TechType = require('./techType');
const models = require('../models');
const authService = require('../services/auth');
const _ = require('lodash');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSong: {
        type: PersonType,
        args: {
          name: {type: GraphQLString},
          surname: {type: GraphQLString},
        },
        resolve(parentValue, {name, surname}) {
          return (new models.Person({name, surname})).save();
      },
    },
    updatePerson: {
      type: PersonType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString},
        surname: {type: GraphQLString},
        title: {type: GraphQLString},
      },
      resolve(parentValue, {name, surname, title, id}) {
        const $set = _.pickBy({name, surname, title}, _.identity);
        return models.Person.findByIdAndUpdate(id, {$set}, {new: true});
      },
    },
    removePerson: {
      type: PersonType,
      args: {id: {type: GraphQLID}},
      resolve(parentValue, {id}) {
        return models.Person.remove({_id: id});
      },
    },
    addTech: {
      type: TechType,
      args: {
        name: {type: GraphQLString},
        use: {type: GraphQLString},
      },
      resolve(parentValue, {name, use}) {
        return (new models.Tech({name, use})).save();
    },
  },
  updateTech: {
    type: TechType,
    args: {
      id: {type: new GraphQLNonNull(GraphQLID)},
      name: {type: GraphQLString},
      use: {type: GraphQLString},
    },
    resolve(parentValue, {name, use, id}) {
      const $set = _.pickBy({name, use}, _.identity);
      return models.Tech.findByIdAndUpdate(id, {$set}, {new: true});
    },
  },
  removeTech: {
    type: TechType,
    args: {id: {type: GraphQLID}},
    resolve(parentValue, {id}) {
      return models.Tech.remove({_id: id});
    },
  },
  register: {
    type: AuthType,
    args: {
      username: {type: GraphQLString},
      password: {type: GraphQLString},
    },
    resolve(parentValue, args) {
      return authService.register(args);
    },
  },
  login: {
    type: AuthType,
    args: {
      username: {type: GraphQLString},
      password: {type: GraphQLString},
    },
    resolve(parentValue, args) {
      return authService.login(args);
    },
  },
  },
});

module.exports = mutation;
