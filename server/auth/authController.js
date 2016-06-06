var connection = require('../db/connection.js');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');


//function that checks for existing email address within database- returns either true or false
//if false, there's nothing in the database corresponding to that email
var checkForExistingEmailInDatabase = function (req, res, callback) {
  const user = req.body;
  connection.query({
      text: 'SELECT * FROM users WHERE email = $1',
      values: [user.email]
    }, 

    (err, result) => {
      console.log('result from querying users table in signup', result);
      if (err) { 
        console.log('error in querying users table');
      }
    // if the email already exists         
      if (result.rows.length) {
        console.log('That email is already taken');
      } else {
        callback(req, res);     
      } 
    }
  );
};

var generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};


var insertIntoFarmsTable = function(req, res, token) {
  const farm = req.body;
  console.log('farm:', farm);
  connection.query({
      text: 'INSERT INTO farms (user_id, farm_name, location, phone) VALUES ((SELECT id FROM users WHERE email = $1), $2, $3, $4)', 
      values: [farm.email, farm.farmName, farm.farmLocation, farm.farmPhone]
    },

    (err, result) => {
      if (err) {
        console.error('error in inserting into farms table:', err);
      } else {
        console.log('farm added!');
        res.status(201).json({
          user: req.body,
          token: token
        });
      }
    }
  );
};

var insertIntoUsersTable = function (req, res) {
  const user = req.body;
  console.log ('user:', user);
  const hash = generateHash(user.password);
  req.body.password = hash;

  connection.query({
      text: 'INSERT INTO users (email, password, farmer) VALUES ($1, $2, $3) RETURNING id',
      values: [user.email, hash, user.isFarmer] //change to farmer
    }, 

    (err, result) => {
      if (err) { console.log('error in inserting user into users table'); }
      user.id = result.rows[0].id;
      const token = jwt.sign({id: user.id}, 'JtEnMq9j0pNlQ0lXZhJEnm', {expiresIn: '2h'});  
      if (user.isFarmer === 'true') {   //change to farmer
        console.log('inserting farmer');
        insertIntoFarmsTable(req, res, token);
      } else {
        res.status(201).json({
          user: user,
          token: token
        });
      }
    }
  );
};

var getFarmerInfo = function(user, res) {
  connection.query({
      text: 'SELECT * FROM farms WHERE user_id = $1',
      values: [user.id]
    }, 

    (err, result) => {
      console.log('result from getFarmerInfo in authController', result);
      if (err) { 
        console.log('error in getting farmer info');
      } else {
        res.status(200).json({
          user: result.rows[0]
        });     
      } 
    }
  );
};


exports.signup = function(req, res) {
  checkForExistingEmailInDatabase(req, res, insertIntoUsersTable);
};

exports.signin = function(req, res) {
  const email = req.body.email;
  // the password entered by the user
  const userPW = req.body.password;

  connection.query({
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email]
    }, 

    (err, result) => {
      console.log('result in signin of authcontroller', result);
      if (err) { 
        console.log('error in querying users table');
      } else {
        // if email exists in db, compare user's entered PW to the one stored in the db
        const user = result.rows[0];
        const dbPassword = result.rows[0].password;
        bcrypt.compare(userPW, dbPassword, (err, match) => {
          if (err) { console.log('wrong password!'); }
          else if (user.farmer === true) {
            getFarmerInfo(user, res);
          } else {
            res.status(200).json({user: result.rows[0]});
          }
        });
      } 
    }
  );
};

