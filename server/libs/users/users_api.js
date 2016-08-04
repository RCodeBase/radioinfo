var users_db = require('./users_db');
var _ = require("underscore");

module.exports = {

IsEmail : function(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
},
getallusers : function(query , cb){
    var skiplimit= {};
    var sort = null;
    query.filter ? filter =  query.filter : filter = {}; 
    if(query.searchName){
        filter["local.username"] = new RegExp(query.searchName,'i');
    }
    if(query.searchEmail){
        filter["local.email"] = new RegExp(query.searchEmail,'i');
    }
    query.fields ? fields =  query.fields : fields = {'local.password':false}; 
    query.skip   ? skiplimit.skip = query.skip : null;
    query.limit  ? skiplimit.limit = query.limit : null;
    query.sort  ? sort = query.sort : null;
    if(sort !== null){
        users_db.find(filter,fields,skiplimit).sort(sort).exec(function(err,result){
            if(err){return cb( err,null);}
            return cb(null,result);
        })
    }else{
        users_db.find(filter,fields,skiplimit).exec(function(err,result){    
            if(err){return cb( err,null);}
            return cb(null,result);
        })
    }
},

getUsersAutocomplete : function(query,cb){
    var filter = {};
    query.searchName ? filter["local.username"] = new RegExp(query.searchName,'i') : filter ={}; 
      users_db.aggregate([{$match: filter }, {$project: {_id:1, username: "$local.username", email :"$local.email"}, } ]).exec(function(err,result){
        if(err){return cb(err,null);}
        return cb(null,result);
    }) 
},
setlogindate : function(id, cb){
    users_db.findOneAndUpdate({_id : id},{last_login : new Date()}).exec(function(err,result){
        if(err){return cb(err,null);}
        return cb(null,result);
    }) 
},

userscount : function(cb){
    users_db.find({isadmin:false}).count().exec(function(err,result){
        if(err){return cb(err,null);}
        return cb(null,result);
    })    
},
getuser : function(id,cb){
    users_db.findOne({_id : id},{'local.password':false}).exec(function(err,result){
        if(err){return cb(err,null);}
        return cb(null,result);
    })
},
getuserbyemail : function(email,cb){
    users_db.findOne({'local.email' : email},{'local.password':false}).exec(function(err,result){
        if(err){return cb(err,null);}
        return cb(null,result);
    })
},
getuserfulldetails : function(id,cb){
    users_db.findOne({'_id' : id}).exec(function(err,result){
        if(err){return cb(err,null);}
        return cb(null,result);
    })
},

deleteuser  : function(id,cb){
    users_db.remove({_id : id,isadmin : false},function(err,data){
        if(err){ return cb(err,null); }
        return cb(null,data);

    })
},
userupdate : function(user,cb){
    users_db.findOneAndUpdate({_id : user._id}, user).populate('roles').exec(function(err, doc){
        if(err){
            return cb(err,null);
        }
        return cb(null,doc);
    })
},
createuser : function(user,cb){
    var newUser = new users_db(user);

    newUser.save(function(err,result){
        if(err){
            return cb(err,null);
        }
        return cb(null,result);
    })
},
verifyuser : function(token, email,cb){
    new_verification_code = Math.floor(Math.random()*90000) + 10000;
    users_db.findOneAndUpdate({verification_code : token,'local.email':email},{verification_code: new_verification_code, verified : true} ).exec(function(err, result){
        if(err){return cb(err,null);}
        console.log(result)
        return cb(null,result);
    })
}

}