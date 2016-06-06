const bodyParser = require('body-parser');


//enable parsing of requests, and connects server to front end
module.exports = function (app, express) {
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../../client/app'));
};
