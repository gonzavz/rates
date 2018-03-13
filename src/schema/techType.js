const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLID} = graphql;

const TechType = new GraphQLObjectType({
  name: 'TechType',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    use: {type: GraphQLString},
  }),
});

module.exports = TechType;
