//var farmData = require('./farmData.sql');
var pg = require('pg');
var conString = 'postgres://localhost:5432/farmdata';
 
//this initializes a connection pool 
//it will keep idle connections open for a (configurable) 30 seconds 
//and set a limit of 10 (also configurable)
var client = new pg.Client(conString);
client.connect();

var query = client.query('CREATE TABLE dogs (id SERIAL, name character varying(20) NOT NULL)');

query.on('end', function() { 
  client.end(); 
});

// pg.connect(conString, function (err, done) {
//   if (err) {
//     return console.error('error fetching client from pool', err);
//   }

//   done();
// });