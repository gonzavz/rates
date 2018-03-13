const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLID} = graphql;

const PersonType = new GraphQLObjectType({
  name: 'PersonType',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    surname: {type: GraphQLString},
    title: {type: GraphQLString},
  }),
});

module.exports = PersonType;
