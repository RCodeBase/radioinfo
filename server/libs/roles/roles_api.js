var roles_db = require('./roles_db');
module.exports = {

	getallroles : function(query,cb){
	    query.filter ? filter =  query.filter : filter = {}; 
	    query.fields ? fields =  query.fields : fields = {}; 

		roles_db.find(filter,fields).sort({machine_name : 1}).exec(function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);
		})
	},

	getrolefromname : function(name,cb){
		roles_db.findOne({machine_name : name },function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);
		})
	},
	getrolebyid : function(id,cb){
		roles_db.findOne({_id : id },function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);
		})
	},

	createrole : function(machine_name , name, cb){
		roles_db.create({name : name ,machine_name:machine_name},function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);	
		});
	},

	updaterole : function(machine_name,name, cb){
		roles_db.findOneAndUpdate({machine_name : machine_name , locked : false},{name : name },function(err, result){
			if(err){ return cb(err,null); }
			return cb(null,result);		
		});
	},
	deleterole : function(machine_name, cb){
		roles_db.remove({machine_name : machine_name , locked:false } ,function(err, result){
			if(err){ return cb(err,null); }
			return cb(null,result);		
		});
	},

	updatepermission : function(json,errors,cb){
		if(Object.keys(json).length > 0){
		    var key = Object.keys(json)[0]; 
			roles_db.findOneAndUpdate({_id:key},{permissions : json[key]},function(err,result){
				if(err){
					errors.push({key : key , err : err});
				}
				delete json[key];
				module.exports.updatepermission(json , errors,cb);
			});
		}else{
			cb(errors);
		}
	},


}