var node_weight_db = require('./node_weight_db');
module.exports = {
	getnodeoftype :function(type,query,cb){
		console.log("type",type);

	    //query.filter ? filter = query.filter : filter = {};
	    query.skip ? query.skip : query.skip = 0;
	    query.limit ? query.limit  :query.limit = 20;

        node_weight_db.findOne({type:type},{ content: {$slice: [ query.skip ,  query.limit ] }} ).populate('content').exec(function(err, result) {
            if (err) {return cb(err, null); }
            return cb(null, result);
        })
	},
	savenodeoftype : function(type ,array, cb){
		node_weight_db.findOneAndUpdate({type : type},{content : array} ,{upsert: true},function(err,result){
			if(err){ return cb(err,null); }
			return cb(null,result);		
		})
	}

}