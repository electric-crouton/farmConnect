var connection = require('../db/connection.js');
var bcrypt = require('bcrypt');
var jwt = require('json-web-token');

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

//function that inserts into the user table
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
var insertIntoFarmsTable = function (userInfo) {
  return new Promise(function (resolve, reject) {
    connection.query(`INSERT INTO farms (farm_name, location, phone) VALUES ('${userInfo.farmName}', '${userInfo.farmLocation}', '${userInfo.farmPhone}')`, function (error, result) {
      console.log('record id is:', result);
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
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

//create a sign in function
exports.signUp = function (request, response) {
  var packet = request.body;
  checkForExistingEmailInDatabase(packet).then(function (checkResult) {
    if (checkResult) {
      response.redirect('/users/signin'); //should have ?exists=1 inside signin to render error message
      return Promise.resolve('Finished');
    }
    return insertIntoDatabase(packet);
  }).then(function () {
    var token = jwt.encode(user.email, 'secret');
    response.json({token: token});
  });
  //front end needs to handle redirection- can't have both data and redirect headers on response
};



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


//handle the sign in
exports.signIn = function (request, response) {
  queryDatabaseForPassword(request.body).then(function (pwObj) {
    if (typeof pwObj === 'string') {
      return Promise.reject (pwObj);
    } else {
      var password = pwObj.u, dbPassword = pwObj.p;
      return isValidPassword(password, dbPassword);
    }
  }).then(function (isValid) {
    console.log('isvalid is:', isValid);
    if (isValid) {
      var token = jwt.encode(request.body.email, 'secret');
      response.json({token: token});
    } else {
      console.error('This username and password combination could not be found. Please try again.');
    }
  });
};


//check that they're signed in before allowing access to certain routes
exports.isSignedIn = function (req, res) {
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







