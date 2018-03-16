const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString} = graphql;
const PersonType = require('./personType');

const AuthType = new GraphQLObjectType({
  name: 'AuthType',
  fields: () => ({
    token: {type: GraphQLString},
    person: {type: PersonType},
  }),
});

module.exports = AuthType;
