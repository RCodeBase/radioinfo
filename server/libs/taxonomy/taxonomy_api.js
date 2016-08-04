var taxonomy_db = require('./taxonomy_db');
module.exports = {
	getalltaxonomy : function(query , cb){
	    query.filter ? filter =  query.filter : filter = {}; 
	    query.fields ? fields =  query.fields : fields = {}; 
		taxonomy_db.find(filter,fields).sort({machine_name:1}).exec(function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);			
		})
	},
	gettaxonomy : function(name , cb){
		taxonomy_db.findOne({machine_name : name},function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);			
		})
	},
	createtaxonomy : function(taxonomy, cb){
		taxonomy_db.create(taxonomy,function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);			
		})
	},
	updatetaxonomy : function(name , taxonomy, cb){
		taxonomy_db.findOneAndUpdate({machine_name : name }, taxonomy,function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);			
		})
	},
	deletetaxonomy : function(name, cb){
		taxonomy_db.remove({machine_name : name },function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);			
		})
	},

	createterm : function(taxonomy_name,term, cb){
		taxonomy_db.findOneAndUpdate({machine_name : taxonomy_name , "terms.machine_name" :{$ne : term.machine_name } }, {$addToSet:{terms : term} },function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);			
		})
	},
	updateterm : function(taxonomy_name ,term_name, term, cb){
		term.machine_name = term_name;
		taxonomy_db.findOneAndUpdate({machine_name : taxonomy_name , "terms.machine_name" : term_name  }, {$set : {"terms.$":term}},function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);			
		})
	},

	deleteterm : function(taxonomy_name , term_name, cb){
		taxonomy_db.findOneAndUpdate({machine_name : taxonomy_name },{$pull :{"terms":{machine_name : term_name}}},function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);			
		})
	},

}