//var farmData = require('./farmData.sql');
var pg = require('pg');
var conString = 'postgres://localhost:5432/farmdata';

var farm = 'CREATE TABLE Farm (id SERIAL PRIMARY KEY, name character varying(10), location character varying(20), phone integer);'; 

var product = 'CREATE TABLE Product (id SERIAL PRIMARY KEY, name character varying(30) UNIQUE);'; 
var post = 'CREATE TABLE Post (id SERIAL PRIMARY KEY, id_Farm integer REFERENCES Farm (id), id_Products integer REFERENCES Products (id), pricePerPound character varying(6), amountAvailable character varying(30));';

 
//this initializes a connection pool 
//it will keep idle connections open for a (configurable) 30 seconds 
//and set a limit of 10 (also configurable)
var client = new pg.Client(conString);
client.connect();

var query1 = client.query(farm);
var query2 = client.query(product);
var query3 = client.query(post);

// query.on('end', function() { 
//   client.end(); 
// });

// pg.connect(conString, function (err, done) {
//   if (err) {
//     return console.error('error fetching client from pool', err);
//   }

//   done();
// });