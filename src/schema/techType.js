const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID} = graphql;

const TechType = new GraphQLObjectType({
  name: 'TechType',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    apply: {type: new GraphQLList(GraphQLString)},
  }),
});

module.exports = TechType;
