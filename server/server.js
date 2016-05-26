const express = require ('express');
const app = express();

require('./config/middlewares/initialization.js')(app, express);
require('./config/routes.js')(app);

console.log('ready to listen');

app.listen(1337);