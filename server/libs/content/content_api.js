var content_db = require('./content_db');
var _ = require('underscore');
var async = require('async');
module.exports = {
	getcontents: function(query, cb) {
	    var skiplimit = {};
	    var sort = null;
		
	    query.filter ? filter = query.filter : filter = {};

		if(query.searchtitle){filter["title"] = new RegExp(query.searchtitle,'i');}
	    query.fields ? fields = query.fields : fields={};
	    query.skip ? skiplimit.skip = query.skip :null;
	    query.limit ? skiplimit.limit = query.limit : null;
	    query.sort ? sort = query.sort : null;
	    if (sort !== null) {
	        content_db.find(filter, fields, skiplimit).sort(sort).populate('creator').populate('contenttype').exec(function(err, result) {
	            if (err) {
	                return cb(err, null); }
	            return cb(null, result);
	        })
	    } else {
	        content_db.find(filter, fields, skiplimit).populate('creator').populate('contenttype').exec(function(err, result) {
	            if (err) {
	                return cb(err, null); }
	            return cb(null, result);
	        })
	    }
	},

getjobs: function(query, cb) {
        var skiplimit = {};
        var sort = null;
        
        query.filter ? filter = query.filter : filter = {};
        if(query.searchtitle){filter["title"] = new RegExp(query.searchtitle,'i');}
        query.fields ? fields = query.fields : fields={};
        query.skip ? skiplimit.skip = query.skip :null;
        query.limit ? skiplimit.limit = query.limit : null;
        query.sort ? sort = query.sort : null;
        if (sort !== null) {
            content_db.find(filter, fields, skiplimit).sort(sort).populate('creator').populate('contenttype').exec(function(err, result) {
                if (err) {
                    return cb(err, null); }
                return cb(null, result);
            })
        } else {
            content_db.find(filter, fields, skiplimit).populate('creator').populate('contenttype').exec(function(err, result) {
                if (err) {
                    return cb(err, null); 
                }
            async.each(result,function(item,callback){
                    var allKeys = _.allKeys(item.fields);
                    if(allKeys.indexOf('station') > -1){
                            var station_name = item.fields['station'][0].machine_name;
                            content_db.findOne({machine_name : station_name},{'fields.logo.url' : 1},function(err,doc){
                                if(err){
                                    return err;
                                }else{
                                    item.fields['station'][0]['url'] = doc.fields.logo.url;
                                    callback();
                                }

                            });
                            
                        }
                    },function(err){
                        if(err){
                            console.log(err);
                        return;
                        }else{
                            return cb(null,result);
                        }
                            
                });
                    
            })
        }
    },
	getcontentbyname : function(machine_name,cb){
		content_db.findOne({machine_name : machine_name}).populate('creator').populate('contenttype').exec(function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);		
		})
	},
	createcontent : function(content,cb){
		content_db.create(content,function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);		
		})
	},
	updatecontent : function(machine_name,content,cb){
		content.updated_on = Date.now();
		content_db.findOneAndUpdate({machine_name: machine_name},content,function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);		
		})
	},
	deletecontent : function(machine_name,cb){
		content_db.remove({machine_name: machine_name},function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);		
		})
	},
	contentscount : function(query , cb){
	query.filter ? filter = query.filter : filter={};;

    content_db.find(filter).count().exec(function(err,result){
        if(err){return cb(err,null);}
	        return cb(null,result);
	    })    
	},
	savecomment : function(machine_name,content,cb){
		console.log("comment in content api",content);
		content_db.findOneAndUpdate({machine_name: machine_name},{$addToSet :{'user_comments' : content}},function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);		
		})
	}
	// updatecomment : function(machine_name,content,cb){
	// 	content.updated_on = Date.now();
	// 	content_db.findOneAndUpdate({machine_name: machine_name},content,function(err,result){
	// 		if(err){ return cb(err,null); }
	// 		return cb(null,result);		
	// 	})
	// },
	// deletecomment : function(machine_name,cb){
	// 	content_db.remove({machine_name: machine_name},function(err,result){
	// 		if(err){ return cb(err,null); }
	// 		return cb(null,result);		
	// 	})
	// }
}