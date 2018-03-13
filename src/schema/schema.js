const graphql = require('graphql');
const {GraphQLSchema} = graphql;
const query = require('./viewerQuery');
const mutation = require('./mutations');

const schema = new GraphQLSchema({
  query,
  mutation,
});

module.exports = schema;
