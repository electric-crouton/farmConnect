var pg = require('pg');

var clientLink = 'postgres://localhost:5432/farmdata';

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