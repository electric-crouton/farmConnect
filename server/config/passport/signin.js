var express = require('express');
var passport = require('passport');
var router = express.Router();

//to allow logging in

router.get('/signin', function(req, res) {
  res.render('login', { user : req.user });
});

router.post('/signin', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});


