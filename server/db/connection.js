var pg = require('pg');

var clientLink = 'postgres://localhost:5432/farmdata';

//callback that allows for connection to the database
module.exports = {
  query: (text, cb) => {
    pg.connect(clientLink, (err, client, done) => {
      client.query(text, (err, result) => {
        done();
        cb(err, result);
      });
    });
  }
};