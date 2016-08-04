var menus_db = require('./menus_db');
module.exports = {
	getallmenus : function(query,cb){
		query.filter ? filter =  query.filter : filter = {}; 
	    query.fields ? fields =  query.fields : fields = {}; 
		menus_db.find(filter , fields).sort({"machine_name" : 1}).exec(function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);			
		});
	},
	getmenusbygid : function(id,cb){
		menus_db.findOne({_id : id },function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);				
		});
	},
	getmenusbyname : function(name,cb){
		menus_db.findOne({machine_name : name },function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);				
		});
	},
	menugroup_create :  function(machine_name, groupname,cb){
		menus_db.create({group_name : groupname , machine_name : machine_name},function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);				
		});
	},
	menugroup_update : function(machine_name, groupname,cb){
		menus_db.findOneAndUpdate({machine_name : machine_name ,locked : false},{group_name : groupname },function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);	
		});
	},
	menugroup_delete : function(machine_name,cb){
		menus_db.remove({machine_name : machine_name ,locked : false},function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);	
		});
	},
	savemenu : function(machine_name, menus,cb){
		menus_db.findOneAndUpdate({machine_name : machine_name },{menus : menus},function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);			
		});
	},

}