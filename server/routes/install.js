var express = require('express') ,
	router = express.Router(),
	db_conf = require('../config/database'),
	users_db = require('../libs/users/users_db');
var roles_db = require('../libs/roles/roles_db');
var mongoose = require('mongoose');

// for using methods inside db
var hash = new users_db();

router.post('/is_on',function(req,res){
	if(db_conf.installation){
		return res.send(200);
	}else{
		return res.send(400);
	}
})

router.post('/',function(req,res){

	if(db_conf.installation){
		//create user json 
		if(!req.body.local.password  || !req.body.local.username || !req.body.local.email){
			return res.send(400).send('something missing');
		}
		req.body.isadmin = true;	 
		req.body.local.password = hash.generateHash(req.body.local.password);
		req.body.type='admin.io';
		//this will drop all collections
		mongoose.connection.db.dropDatabase(function(err, result) {
		
			users_db.create(req.body,function(err,data){
				if(err){return  res.status(400).send(err);}
				//user created go for roles
				roles_db.create({name : 'anonymous user' ,locked : true,machine_name:'anonymous_user'},{name : 'administrator' ,locked : true,machine_name:'administrator'},{name : 'authenticated user',locked : true ,machine_name:'authenticated_user'},function(err,result){
					if(err){return  res.status(400).send(err);}
					return res.status(200).send('Installation Success');
				})
			})
		});
	}else{
		return res.send(400);
	}
	// res.send(200);
})

module.exports = router;