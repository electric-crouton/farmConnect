const bodyParser = require('body-parser');
const passport = require('passport');

module.exports = function (app, express) {
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use(express.static(__dirname + '/../../../client/app'));
};
