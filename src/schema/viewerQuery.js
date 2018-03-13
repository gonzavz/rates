const graphql = require('graphql');
const {GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLList} = graphql;
const PersonType = require('./personType');
const TechType = require('./techType');
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
    tech: {
      type: TechType,
      args: {id: {type: new GraphQLNonNull(GraphQLID)}},
      resolve(parentValue, {id}) {
        if (!ObjectId.isValid(id)) {
          return null;
        }
        return models.Tech.findById(id);
      },
    },
    technologies: {
      type: new GraphQLList(TechType),
      resolve() {
        return models.Tech.find({});
      },
    },
  }),
});

module.exports = viewer;
