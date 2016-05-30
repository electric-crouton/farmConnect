var express = require ('express');
var app = express();

require('./config/middlewares/initialization.js')(app, express);
require('./config/routes.js')(app);

console.log('Server listening on port 1337');

app.listen(1337);


