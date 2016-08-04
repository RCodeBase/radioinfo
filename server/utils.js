var express = require('express'),
	roles_api = require('./libs/roles/roles_api');

var utils = {};
utils.havepermission = function(req,per_type,permissions,cb){
	console.log('permissions',permissions);
	if(req.user){
		var result = false;
		
		if(req.user.isadmin==true){
			return cb(true);
		}
		console.log(req.user.roles);
		var total_permissions = new Array();

		req.user.roles.forEach(function(role){
			total_permissions = role.permissions[per_type].concat(total_permissions);
		})

		permissions.forEach(function(permission){
			if(total_permissions.indexOf(permission) > -1){
				result = true;
			}
		});	

		return cb(result);
	}
	else{
		var final_result = false;
		roles_api.getrolefromname("anonymous_user" , function(err,result){

			permissions.forEach(function(permission){
				if(result.permissions[per_type].indexOf(permission) > -1){
					result = true;
				}
			});	
			return cb(result);
		})
	}
}

module.exports = utils;
