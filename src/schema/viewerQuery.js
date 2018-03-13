const graphql = require('graphql');
const {GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLList} = graphql;
const PersonType = require('./personType');
const models = require('../models');
const ObjectId = require('mongoose').Types.ObjectId;

const viewer = new GraphQLObjectType({
  name: 'ViewerQueryType',
  fields: () => ({
    person: {
      type: PersonType,
      args: {id: {type: new GraphQLNonNull(GraphQLID)}},
      resolve(parentValue, {id}) {
        if (!ObjectId.isValid(id)) {
          return null;
        }
        return models.Person.findById(id);
      },
    },
    people: {
      type: new GraphQLList(PersonType),
      resolve() {
        return models.Person.find({});
      },
    },
  }),
});

module.exports = viewer;
