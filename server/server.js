
//npm modules
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var passport = require('passport');
// var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var MongoStore = require('connect-mongo')(session);
var cors = require('express-cors');
var http = require('http');
var https = require('https');
var httpProxy = require('http-proxy');

var fs = require('fs');
var path = require('path');


// var proxy = httpProxy.createProxyServer(options);
// configuration ===============================================================
var configDB = require('./config/database.js');
mongoose.connect(configDB.url); // connect to our database


app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//set port number
var port = process.env.PORT || 3000;

app.use(session({ secret: 'secretkey' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions



//session in mongo
app.use(session({
  secret: 'radioinfo',
  store: new MongoStore({
    "db": configDB.db,
    "host": configDB.host,
    "port": configDB.port,
    "collection": configDB.collection,
    "clear_interval": 3600,
    "auto_reconnect": true,
      cookie: {
        signed: false,      // cookie is signed using KeyGrip
        httpOnly: false,    // cookie is not accessible via client-side JS
        overwrite: false    // overwrite existing cookie datawhen setting cookie
      },
       key: 'cookie.sid' ,
      cache: {
        ttl: 1000 * 10     // cache time to live in RAM before pass-through to store
      }
  })
}));


//cross origin setting
app.use(cors({
  allowedOrigins: [
    'lr.com:5000', 'admin.lr.com:4000','http://lr.com','https://lr.com','http://admin.lr.com','https://admin.lr.com'
  ],
  credentials: true
}))



//doamins settting
var DomainAppMap = {
 'lr.com': 'client.io',
 'http://admin.lr.com:4000': 'admin.io',
 'https://lr.com': 'client.io',
 'https://admin.lr.com': 'admin.io'
};


//set application for session saving
app.use(function(req, res, next) {
    var origin = req.headers['origin'];
    req.application = DomainAppMap[origin];
 next()
});




require('./libs/users/passport')(passport);
require('./routes/index')(app);
require('./routes/images')(app,__dirname);
require('./routes/analytics')(app,__dirname);

app.listen(port);
console.log('Magic happens on port ' + port);

module.exports = app;