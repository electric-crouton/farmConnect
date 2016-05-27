var express = require ('express');
var app = express();

require('./config/middlewares/initialization.js')(app, express);
require('./config/routes.js')(app);

app.listen(1337);
