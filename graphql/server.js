
//server.js
import express from 'express';
import ItemSchema from './graphql';
import { graphql } from 'graphql';
import bodyParser from 'body-parser';

let app = express();
const PORT=process.env.port

//Parse post content as text
app.use(bodyParser.text({ type: 'application/graphql' }));

app.post('/graphql', (req, res) => {
  //GraphQL executor
  graphql(ItemSchema, req.body)
  .then((result) => {
    res.send(JSON.stringify(result, null, 2));
  })
});

let server = app.listen(PORT, function() {
  let host = server.address().address;
  let port = server.address().port;

  console.log('GraphQL listening at http://%s:%s', host, port);
});