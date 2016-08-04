var express  = require('express');
var app      = express();

//set public directories 
// app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/../client'));
//set port number
var port = process.env.PORT || 5000;

app.listen(port);
console.log('Magic happens on port ' + port);

module.exports = app;