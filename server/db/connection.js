var pg = require('pg');

var clientLink = 'postgres://localhost:5432/farmdata';

// pg.connect(clientLink, function (err, client, done) {
//   if (err) {
//     console.error('error!', err);
//     process.exit(1);
//   }
// });

module.exports = {
  query: function(text, cb) {
    pg.connect(clientLink, function(err, client, done) {
      client.query(text, function(err, result) {
        done();
        cb(err, result);
      });
    });
  }
};

// client.query('SELECT * FROM farm', function (err, result) {
//     if (err) {
//       console.error('error!', err);
//     } else {
//       console.log(result);
//     }
//     done();
// });