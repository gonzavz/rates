const express = require('express');
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
const options = {}; // {autoIndex: false};
mongoose.Promise = global.Promise;
mongoose.connect(uri, options)
  .then(() => console.info(`Successfully conected to ${uri}`))
  .catch((error) => console.error(`Unable to connect to Mongo [${uri}] due to: ${error}`));

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));


const port = process.env.PORT | 4000;

app.listen(port, () => console.log(`Rates server running on port ${port}`));
