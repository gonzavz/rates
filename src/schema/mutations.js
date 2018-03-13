const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID} = graphql;
const PersonType = require('./personType');
const models = require('../models');
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
  },
});

module.exports = mutation;
