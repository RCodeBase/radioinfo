var express = require('express'),
	router = express.Router(),
	utils = require('../utils'),
	users_db = require('../libs/users/users_db'),
	users_api = require('../libs/users/users_api'),
	roles_api = require('../libs/roles/roles_api'),
	mail = require('../config/mail')
	passport = require('passport');
var _ = require("underscore");
var http = require('http');
var request = require('request');

// for using methods inside db
var hash = new users_db();

/**
 * Register call for anonymous
 */
router.post('/register',function(req,res){
	console.log("req body",req.body);
	var url = 'https://www.google.com/recaptcha/api/siteverify?secret=6LcsaxgTAAAAABQTgOs47gF8ER4LY2YjVhuc7ofT&response='+req.body.response;
	request(url, function (error, response, body) {
		 if (!error && response.statusCode == 200) {
		 	var data = JSON.parse(body)
		   if(data.success){
			   	var user = {};
				user.local = {};
				user.local.username = req.body.local.username;
				users_api.IsEmail(req.body.local.email) ?  user.local.email = req.body.local.email : null ;
				req.body.local.password ? user.local.password = hash.generateHash(req.body.local.password) :null ;
				user.verification_code = Math.floor(Math.random()*90000) + 10000;
				console.log('user',user);
				users_api.createuser(user,function(err,result){
					if(err && err.name == "ValidationError"){
						errors = validation_err(err);
						console.log("validation_err",errors);
						return res.status(400).send({ermessage :errors});
					}
					if(err){
						return res.status(400).send(err);
					}	
					mail.welcomemail(user.verification_code,req.body.local.username ,req.body.local.email )
					return res.status(200).send(result);
				});
			}
		}
	})	

});

/**
 *Login User
 */
router.post('/login', function(req, res, next) {
    var errors = {};
    req.body.username ? req.body.username : errors.username = 'Username/Email Required'; 
    req.body.password ? req.body.password : errors.password = 'Password Required'; 
   
    if(errors.length  > 0){
        res.status(400).send( errors);
        return;
    }
    passport.authenticate('local-login', function(err, user, info) {
        if(user._id){
                req.logIn(user, function(err) {
	                if (err) { return next(err); }
	                return;
	            });
        }
        if(err)   res.status(400).send({ermessage : err}); 
        if(info)  res.status(400).send({ermessage : info});
        if(user)  res.status(200).send(user);
     })(req, res, next);
})

/**
 * get user
 */
router.get('/islogin',function(req,res){
	console.log("req.user in users.js",req.user);
	if(req.user){
		res.status(200).send(req.user); 
	}else{
		res.status(401).send({ermessage : "User Not Login"});	
	}
});

/**
 * logout user
 */
router.get('/logout', function(req, res) {
	console.log('logut calling .............',req.user);
    req.logout();
    res.status(200).send('User Deleted')
	console.log('logut calling .............',req.user);
});

/**
 * get all users
 */
router.get('/all',function(req,res){
	var Query = {};
	if(Object.keys(req.query).length  > 0){
		Query = JSON.parse(req.query.query);
	}
	users_api.getallusers(Query , function(err,data){
		if(err){return  res.status(400).send(err)}
		res.status(200).send(data);
	})
})

/**
 * get all users
 */
router.get('/all/forautocomplete',function(req,res){
	var Query = {};
	if(Object.keys(req.query).length  > 0){
		Query = JSON.parse(req.query.query);
	}
	users_api.getUsersAutocomplete(Query , function(err,data){
		if(err){return  res.status(400).send(err)}
		res.status(200).send(data);
	})
})


router.get('/all/count',function(req,res){
	users_api.userscount(function(err,data){
		if(err){return  res.status(400).send(err);}
		return res.status(200).json(data);
	})
})
/**
 * get user by id
 */
router.get('/:id',function(req,res){
	users_api.getuser(req.params.id,function(err,data){
		if(err){return  res.status(400).send(err)}
		res.status(200).send(data);
	})
})

/**
 * get user by email
 */
router.get('/email/:email',function(req,res){
	users_api.getuserbyemail(req.params.email,function(err,data){
		if(err){return  res.status(400).send(err)}
		res.status(200).send(data);
	})
})

/**
 *create user only for admin
 */
router.post('/create',function(req,res){

	utils.havepermission(req,'administration',['users'],function(permission){
		if(permission){
			users_api.IsEmail(req.body.local.email) ? req.body.local.email : req.body.local.email = null ;
			req.body.local.password ? req.body.local.password = hash.generateHash(req.body.local.password) :null ;
			req.body.isadmin ? req.body.isadmin = false : null;
			req.body.type = 'admin.io';

			roles_api.getrolefromname('authenticated_user',function(err,result){
				if(err){return  res.status(400).send(err)}

				if(req.body.roles.indexOf(result._id) == -1){
					req.body.roles.push(result._id);
				}
			
				users_api.createuser(req.body,function(err,data){
					if(err && err.name == "ValidationError"){
						errors = validation_err(err);
						return res.status(400).send({ermessage :errors});
					}
					if(err){return  res.status(400).send(err)}
					res.status(200).send(data);
				});	
			})
		}else{
			return  res.status(400).send('Permission Denied');
		}
	})
})

/**
 *udpate user 
 */
router.put('/:id', function(req, res) {

	utils.havepermission(req,'administration',['users'],function(permission){
		if(permission || req.user._id == req.params.id){
		    //need some filter like status
		    req.body.isadmin ? req.body.isadmin = false : null;
		    users_api.getuserfulldetails(req.params.id, function(err, data) {
		        if (err) {
		            return res.status(400).send(err)
		        } else {
		            var pass = data.local.password;
		            _.extend(data, req.body);
		            data.local.password = pass;
		            req.body.local.password ? data.local.password = hash.generateHash(req.body.local.password) : null;

		            roles_api.getrolefromname('authenticated_user', function(err, result) {
		                if (err) {
		                    return res.status(400).send(err) }

		                if (data.roles.indexOf(result._id) == -1) {
		                    data.roles.push(result._id);
		                }
		                users_api.userupdate(data, function(err, data) {
		                    if (err && err.name == "ValidationError") {
		                        errors = validation_err(err);
		                        return res.status(400).send({ ermessage: errors });
		                    }

		                    if (err) {
		                        return res.status(400).send(err) }
		                    res.status(200).send(data);
		                })
		            });

		        }
		    })
		}else{
			return  res.status(400).send('Permission Denied');
		}
	})
})

/**
 * Change password
 */
router.put('/change/password',function(req,res){
	//console.log("login detail",req.user);
	if(req.user.validPassword(req.body.local.password)){
		users_api.getuserfulldetails(req.user._id,function(err,data){
			if(err){
				return  res.status(400).send(err);
			}else{
				req.user.local.password = hash.generateHash(req.body.npassword);
				users_api.userupdate(req.user, function(err,data){
					if(err){
						return res.status(400).send(err);
					}else{
						res.status(200).send("User Updated");
					}
				})
			}
		})
	}else{
		return res.status(400).send(err);
	}
})

/**
 * Reset Password
 */
router.get('/reset/password',function(req,res){
	var Query = {};
	if(Object.keys(req.query).length  > 0){
		Query = JSON.parse(req.query.query);
	}
	users_api.getallusers(Query , function(err,data){
		if(err){return  res.status(400).send(err)}
		else if(data.length > 0){
			console.log("data in users route",data);
			var path = 'http://lr.com:5000/#/user/reset/password/'+data[0].verification_code+'/'+data[0].local.email;
			var html = 'Hey '+data[0].local.username+',<br><br>Please <a href='+path+'>Click here</a> to reset your password.';			
			mail.sendmail(data[0].local.email, 'Reset password' , html)
			return res.status(200).send(data);
		}
		else{
			return  res.status(401).send("Email does not exist");
		}
		
	})
})


/**
 * verify email
 */
router.post('/verify/:email/:token',function(req,res){
	users_api.verifyuser(req.params.token,req.params.email,function(err,data){
		if(err){return  res.status(400).send(err)}
		console.log("return data on user delete",data);
		res.status(200).send(data);
	})
})

/**
 * delete user by id
 */
router.delete('/:id', function(req, res) {
    utils.havepermission(req, 'administration', ['users'], function(permission) {
        if (permission) {

            users_api.deleteuser(req.params.id, function(err, data) {
                if (err) {
                    return res.status(400).send(err)
                }
                res.status(200).send("User Deleted");
            })
        } else {
            return res.status(400).send('Permission Denied');
        }
    })

})



function validation_err(err){
	var errors ={};
	for(key in err.errors){
		if(err.errors[key].type == 'required'){
			errors[err.errors[key].path.replace("local.","")] = err.errors[key].path.replace("local.","") +' Missing';
		}else{
			 errors[err.errors[key].path.replace("local.","")] = err.errors[key].path.replace("local.","") +' already exist';
		}
	}
	return errors;
}
module.exports =router;