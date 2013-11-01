var express = require('express'),
    path = require('path');

require('./config/environments/passport');
require('./config/environments/db');

var app = express();
app.directory = __dirname;

require('./config/environments')(app);

module.exports = app;


require('./routes')(app);