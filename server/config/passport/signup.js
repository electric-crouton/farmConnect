var Account = require('../models/account');
var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/signup', function(req, res) {
  res.render('signup', { });
});

router.post('/signup', function(req, res) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.render('register', { account : account });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});