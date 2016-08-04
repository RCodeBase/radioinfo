var express = require('express'),
	router = express.Router(),
	utils = require('../utils'),
	roles_api = require('../libs/roles/roles_api');
	contenttype_api = require('../libs/contenttype/contenttype_api');



router.get("/all",function(req,res){
	var Query = {};
	if(Object.keys(req.query).length  > 0){
		Query = JSON.parse(req.query.query);
	}

	roles_api.getallroles(Query,function(err,result){
		if(err){ return res.status(400).send(err);}
		return res.status(200).send(result);
	});
});

router.get("/id/:id",function(req,res){
	roles_api.getrolebyid(req.params.id , function(err,result){
		if(err){ return res.status(400).send('No role found');}
		return res.status(200).send(result);
	});
});

router.get("/name/:machine_name",function(req,res){
	roles_api.getrolefromname(req.params.machine_name , function(err,result){
		if(err){ return res.status(400).send('No role found');}
		return res.status(200).send(result);
	});
});


router.post("/:machine_name",function(req,res){
    utils.havepermission(req, 'administration', ['roles'], function(permission) {
        if (permission) {
       		
       		roles_api.createrole(req.params.machine_name,req.body.name , function(err,result){
				if(err){ return res.status(400).send(err);}
				return res.status(200).send(result);
			});

        } else {
            return res.status(400).send('Permission Denied');
        }
    })
});

router.put("/:machine_name",function(req,res){
    utils.havepermission(req, 'administration', ['roles'], function(permission) {
        if (permission) {
       		
			roles_api.updaterole(req.params.machine_name, req.body.name, function(err,result){
				if(err){ return res.status(400).send(err);}
				return res.status(200).send(result);
			});

        } else {
            return res.status(400).send('Permission Denied');
        }
    })
});

router.delete("/:machine_name",function(req,res){
    utils.havepermission(req, 'administration', ['permisions'], function(permission) {
        if (permission) {

			roles_api.deleterole(req.params.machine_name , function(err,result){
				if(err){ return res.status(400).send(err);}
				return res.status(200).send('Role Deleted');
			});

        } else {
            return res.status(400).send('Permission Denied');
        }
    })

})


//permissions
router.get("/all/permissions",function(req,res){
var permissions = {"administration": ['users','roles','permisions','taxonomy','menus','content types','comment'],
				   "content": ['administration content'],
				   "comment": ['view comments','post comment','edit own comment'],
				   };
				   
	contenttype_api.getallcontenttype({fields :{machine_name: 1,_id:0}},function(err,result){

		if(result.length > 0){
			result.forEach(function(type){

				console.log(type);
				permissions.content.push('create '+type.machine_name);
				permissions.content.push('edit own '+type.machine_name);
				permissions.content.push('edit any '+type.machine_name);
				permissions.content.push('delete own '+type.machine_name);
				permissions.content.push('delete any '+type.machine_name);
			})
			return res.status(200).send(permissions);
		}else{
			return res.status(200).send(permissions);
		}

	})
});

router.put('/permissions/updatepermissions',function(req,res){
    utils.havepermission(req, 'administration', ['permisions'], function(permission) {
        if (permission) {

			var errors = new Array();
			roles_api.updatepermission(req.body,errors, function(err){
				if(err.length > 0){
					 return res.status(400).send(err);
				}
				return res.status(200).send("Permissions Updated");
			});
    
        } else {
            return res.status(400).send('Permission Denied');
        }
    })

})
module.exports = router;