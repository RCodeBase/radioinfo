var express = require('express') ,
	router = express.Router(),
	menus_api = require('../libs/menus/menus_api');
	utils = require('../utils');

router.get("/all",function(req,res){
	var Query = {};
	if(Object.keys(req.query).length  > 0){
		Query = JSON.parse(req.query.query);
	}


	menus_api.getallmenus(Query , function(err,result){
		if(err){ return res.status(400).send(err);}
		return res.status(200).send(result);
	}); 
});

router.get("/group/:machine_name",function(req,res){
	menus_api.getmenusbyname(req.params.machine_name , function(err,result){
		if(err){ return res.status(400).send("No group found");}
		return res.status(200).send(result);
	}); 
});

router.post("/group/:name/:label",function(req,res){
    utils.havepermission(req, 'administration', ['menus'], function(permission) {
        if (permission) {
			menus_api.menugroup_create(req.params.name,req.params.label , function(err,result){
				if(err){ return res.status(400).send(err);}
				return res.status(200).send(result);
			}); 
	    } else {
            return res.status(400).send('Permission Denied');
        }
    })
});

router.put("/group/:machine_name/:name",function(req,res){
    utils.havepermission(req, 'administration', ['menus'], function(permission) {
        if (permission) {
			menus_api.menugroup_update(req.params.machine_name, req.params.name, function(err,result){
				if(err){ return res.status(400).send(err);}
				return res.status(200).send(result);
			}); 
	    } else {
            return res.status(400).send('Permission Denied');
        }
    })
});

router.delete("/group/:machine_name",function(req,res){
    utils.havepermission(req, 'administration', ['menus'], function(permission) {
        if (permission) {
			menus_api.menugroup_delete(req.params.machine_name , function(err,result){
				if(err){ return res.status(400).send(err);}
				return res.status(200).send('Group deleted');
			});
	    } else {
            return res.status(400).send('Permission Denied');
        }
    }) 
});

router.post("/:machine_name",function(req,res){
    utils.havepermission(req, 'administration', ['menus'], function(permission) {
        if (permission) {
			menus_api.savemenu(req.params.machine_name,req.body.menus, function(err,result){
				if(err){ return res.status(400).send(err);}
				return res.status(200).send(result);
			}); 
	    } else {
            return res.status(400).send('Permission Denied');
        }
    }) 
});


module.exports = router;