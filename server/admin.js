var express  = require('express');
var app      = express();
var fs = require('fs');
var Busboy = require('busboy');

//set public directories 
// app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/../admin'));
//set port number
var port = process.env.PORT || 4000;

require('./routes/images')(app,__dirname);

app.listen(port);
console.log('Magic happens on port ' + port);

module.exports = app;