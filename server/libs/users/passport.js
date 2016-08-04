//use statergy
var LocalStrategy = require('passport-local').Strategy,
    users_api = require('./users_api'),
    users_db = require('./users_db');

// for using methods inside db
var hash = new users_db();

module.exports = function(passport) {
    //used for searlize user
    passport.serializeUser(function(user, done) {
          done(null, {"id":user._id,"type":user.type});
    });
  

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
       users_db.findOne({_id : id.id,type :id.type}).populate('roles').exec(function(err, user) {
            done(err, user);
        });
    });

    //local-login strategy
    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function(req, username, password, done) {
            process.nextTick(function() {
                console.log('Auth Local Login starts after',req.application);

                var email_username = {};
                users_api.IsEmail(username) ? email_username["local.email"] = username : email_username["local.username"] = username;

                users_db.findOneAndUpdate(email_username,{last_login : new Date()}).exec(function(err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (!user) {
                        return done(null, false, {username :"No User Found"});
                    }

                    if (!user.validPassword(password)) {
                        return done(null, false,{password : "Wrong Password"} );
                    } else {
                        console.log("req.application in passport",req.application);
                         if (req.application === 'admin.io') {
                            user.type = 'admin.io';
                          } else if (req.application === 'client.io'){
                            user.type = 'client.io'; 
                          } else  {
                            user.type = 'client.io';
                          }
                        req.user = user;
                        console.log("req.user in passport",req.user);
                        return done(null, user);
                    }
                });

            });
        }
    ));
}
