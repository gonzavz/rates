const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID} = graphql;

const TechType = new GraphQLObjectType({
  name: 'TechType',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    use: {type: new GraphQLList(GraphQLString)},
  }),
});

module.exports = TechType;
