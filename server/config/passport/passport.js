var passport = require('passport'); 
var Strategy   = require('passport-local').Strategy;

// import db connection 

// expose this function to our app using module.exports
module.exports = function(passport) {

  // LOCAL SIGNUP ============================================================
  // we are using named strategies since we have one for signin and one for signup
  // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new Strategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
      connection.query("select * from users where email = '"+ email + "'", function(err,rows){
        console.log(rows);
        if (err) { return done(err); }
                  
        if (rows.length) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
        // if there is no user with that email, create the user
        var newUser = {};
        newUser.email    = email;
        newUser.password = password; // use the generateHash function 

        var insertQuery = "INSERT INTO users (email, password) values ('" + email +"','"+ password +"')";
        console.log(insertQuery);
        connection.query(insertQuery, function(err,rows) {
          newUser.id = rows.insertId;
          return done(null, newUser);
        }); 
        } 
    });
    }));

    // LOCAL SIGNIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for signin and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signin', new Strategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
      connection.query("SELECT * FROM `users` WHERE `email` = '" + email + "'", function(err,rows){
      if (err) { return done(err); }
                
      if (!rows.length) {
        return done(null, false, req.flash('signinMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
      } 
      
      // if the user is found but the password is wrong
      if (rows[0].password !== password) {
        return done(null, false, req.flash('signinMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
      }
  
      // all is well, return successful user
      return done(null, rows[0]);     
    
      });
    }));

};