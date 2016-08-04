var contenttype_db = require('./contenttype_db');
module.exports = {
	getallcontenttype : function(query,cb){
	    var skiplimit= {};
	    var sort = null;
	    query.filter ? filter =  query.filter : filter = {}; 
	    query.fields ? fields =  query.fields : fields = {'local.password':false}; 
	    query.skip   ? skiplimit.skip = query.skip : null;
	    query.limit  ? skiplimit.limit = query.limit : null;
	    query.sort  ? sort = query.sort : null;

	    if(sort !== null){
	        contenttype_db.find(filter,fields,skiplimit).sort(sort).exec(function(err,result){
	            if(err){return cb( err,null);}
	            return cb(null,result);
	        })
	    }else{
	        contenttype_db.find(filter,fields,skiplimit).exec(function(err,result){    
	            if(err){return cb( err,null);}
	            return cb(null,result);
	        })
	    }
	},
	getcontenttypebyname : function(name , cb){
		contenttype_db.findOne({machine_name : name },function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);		
		})
	},
	createcontenttype : function(data, cb){
		contenttype_db.create(data ,function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);		
		})
	},
	updatecontenttype : function(name, data, cb){
		contenttype_db.findOneAndUpdate({ machine_name: name },data ,function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);		
		})
	},
	deletecontenttype : function(name, cb){
		contenttype_db.remove({ machine_name: name },function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);		
		})
	},

	getfield :function(content_type_name, field_name,cb){
		contenttype_db.findOne({ machine_name: content_type_name },{"fields": {$elemMatch: {"machine_name": field_name}}},function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);		
		})
	},
	createfield : function(content_type_name, field_data,cb){
		contenttype_db.findOneAndUpdate({ machine_name: content_type_name,'fields.machine_name' : {$ne : field_data.machine_name } },{$addToSet :{'fields' :field_data} },function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);		
		})
	},
	updatefield : function(content_type_name,field_name,field_data,cb){
		contenttype_db.findOneAndUpdate({ machine_name: content_type_name,'fields.machine_name' : field_name },{$set : {"fields.$":field_data}},function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);		
		})
	},
	deletefield : function(content_type_name,field_name,cb){
		contenttype_db.findOneAndUpdate({ machine_name: content_type_name },{ $pull: {fields:{ machine_name : field_name}}},function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);		
		})

	}
}