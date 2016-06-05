var connection = require('../db/connection.js');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var Promise = require('bluebird');
var passport = require('passport');
var Strategy   = require('passport-local').Strategy;


//function that checks for existing email address within database- returns either true or false
//if false, there's nothing in the database corresponding to that email
var checkForExistingEmailInDatabase = function (packet) {
  return new Promise(function (resolve, reject) {
    connection.query(`SELECT id FROM users WHERE users.email = '${packet.email}'`, function (error, result) {
      console.log('querying database for existing email');
      if (error) {
        reject(error);
      } else {
        resolve(result.rows.length > 0);
      }
    });
  });
};

var generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

//function that inserts into the users table
var insertIntoUsersTable = function (userInfo) {
  var password = generateHash(userInfo.password);
  return new Promise(function (resolve, reject) {
    var insertQuery = `INSERT INTO users (email, password, farmer) VALUES ('${userInfo.email}', '${password}', '${userInfo.isFarmer}') RETURNING id`;
    connection.query(insertQuery, function (error, result) {
      if (error) {
        reject(error);
      } else {
        console.log('result from insert into user table is:', result);
        resolve(result);
      }
    });
  });
};

//function that inserts into the farmer table
// var insertIntoFarmsTable = function (userInfo) {
//   return new Promise(function (resolve, reject) {
//     connection.query(`INSERT INTO farms (farm_name, location, phone) VALUES ('${userInfo.farmName}', '${userInfo.farmLocation}', '${userInfo.farmPhone}')`, function (error, result) {
//       console.log('record id is:', result);
//       if (error) {
//         reject(error);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// };

var insertIntoFarmsTable = function(req, res, token) {
  console.log('inside insertIntoFarmsTable >>>>');
  connection.query(
    `INSERT INTO farms (farm_name, location, phone)\
    VALUES ('${req.body.farmName}', '${req.body.farmLocation}', '${req.body.farmPhone}')`, 

    (err, result) => {
      if (err) {
        console.error('error:', err);
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

//function that inserts into a database
  //if the farmer value is false, resolve the promise
  //otherwise, call the function that inserts into the farmer table
var insertIntoDatabase = function (packet) {
  console.log('inserting into database');
  return new Promise (function (resolve, reject) {
    return insertIntoUsersTable(packet).then(function () {
      if (packet.isFarmer) {
        return insertIntoFarmsTable(packet);
      }
      return resolve();
    });
  });
};

// exports.signup = function (req, res) {
//   console.log('inside signup of authcontroller in server');
//   var packet = req.body;
//   checkForExistingEmailInDatabase(packet).then(function (checkResult) {
//     if (checkResult) {
//       return Promise.resolve('Finished');
//     }
//     return insertIntoDatabase(packet);
//   }).then(function () {
//     var token = jwt.encode(user.email, 'secret');
//     res.json({token: token});
//   });
// };



//  >>>>>>>>>>> THIS PORTION OF THE CODE WILL HANDLE ALL SIGN INS.



//query the database for the password and compare it to what's been provided by the user
var queryDatabaseForPassword = function (userInfo) {
  return new Promise(function (resolve, reject) {
    connection.query(`SELECT password FROM users WHERE users.email = '${userInfo.email}' `, function (error, result) {
      if (error) {
        reject(error);
      } else {
        var dbPassword = result.rows[0].password || null;
        if (dbPassword) {
          console.log('userinfo password is:', userInfo.password, 'the db password is:', dbPassword);
          resolve({u: userInfo.password, p: dbPassword});
        } else {
          resolve('No such password exists');
        }
      }
    });
  });
};

var isValidPassword = function (password, dbPassword) {
  return new Promise(function (resolve, reject) {
    return bcrypt.compare(password, dbPassword, function (err, res) {
      if (err) {
        throw err;
      }
      resolve(res);
    });
  });
};


// exports.signin = function (req, res) {
//   queryDatabaseForPassword(req.body).then(function (pwObj) {
//     if (typeof pwObj === 'string') {
//       return Promise.reject (pwObj);
//     } else {
//       var password = pwObj.u, dbPassword = pwObj.p;
//       return isValidPassword(password, dbPassword);
//     }
//   }).then(function (isValid) {
//     console.log('isvalid is:', isValid);
//     if (isValid) {
//       var token = jwt.encode(req.body.email, 'secret');
//       res.json({token: token});
//     } else {
//       console.error('This username and password combination could not be found. Please try again.');
//     }
//   });
// };


//check that they're signed in before allowing access to certain routes
exports.isSignedin = function (req, res) {
  var token = req.headers['x-access-token'];
  if (!token) {
    return false;
  } else {
    var user = jwt.decode(token, 'secret');
    connection.query(`SELECT EXISTS (SELECT * FROM users WHERE users.email = '${user.email}')`, function (err, result) {
      if (err) {
        throw err;
      }
      res.redirect('/');
    });
  }

};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


const generateToken = function(user, next) {  
  req.token = jwt.sign({
    id: user.id
  }, 'server secret', {
    expiresInMinutes: 120
  });
  next();
};

exports.signup = function(req, res) {
  console.log('req.body: ', req.body);
  const email = req.body.email;
  const password = generateHash(req.body.password);
  const isFarmer = req.body.isFarmer;
  // passport.use('local-signup', new Strategy({
  //   // by default, local strategy uses username and password, we will override with email
  //   usernameField : 'email',
  //   passwordField : 'password',
  //   passReqToCallback : true, // allows us to pass back the entire request to the callback
  //   session: false
  // }, function(req, email, password, done) {

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
      connection.query("select * from users where email = '" + email + "'", function(err, rows){
        console.log(rows);
        if (err) { 
          // return done(err); 
          console.log('error in querying users table');
        }
                  
        if (rows.length) {
          console.log('That email is already taken');
          // return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
        // if there is no user with that email, create the user
        var newUser = {};
        newUser.email    = email;
        newUser.isFarmer = isFarmer;
        req.body.password = password;

        var insertQuery = `INSERT INTO users (email, password, farmer) VALUES ('${email}', '${password}', '${isFarmer}') RETURNING id`;
        connection.query(insertQuery, function(err, result) {
          console.log('result: ', result);
          newUser.id = result.rows[0].id;
          var token = jwt.sign({
              id: newUser.id
            }, 'server secret', {
              expiresIn: '2h'
            });
          
          newUser.token = token;
          if (isFarmer == 'true') {
            insertIntoFarmsTable(req, res, token);
          } else {
            res.status(201).json({
              user: req.body,
              token: token
            });
          }
          // return done(null, newUser);
        }); 
        } 
      });
    // }));
};

exports.signin = function(req, res) {
  const email = req.body.email;
  // the password entered by the user
  const userPW = req.body.password;

  connection.query("select * from users where email = '" + email + "'", function(err, result) {
    console.log('result in signin of authcontroller', result);
    if (err) { 
      // return done(err); 
      console.log('error in querying users table');
    } else {
    // if email exists in db, compare user's entered PW to the one stored in the db
    const dbPassword = result.rows[0].password;
    bcrypt.compare(userPW, dbPassword, function(err, match) {
        if (err) { console.log('wrong password!'); }
        res.status(200).json({
          user: result.rows[0]
        });
    });
    } 
  });
};








