var express = require('express') ,
	router = express.Router(),
	contenttype_api = require('../libs/contenttype/contenttype_api');
	utils = require('../utils');

router.get('/all',function(req,res){
	var Query = {};
	if(Object.keys(req.query).length  > 0){
		Query = JSON.parse(req.query.query);
	}
	contenttype_api.getallcontenttype(Query,function(err,result){
		if(err){ return res.status(400).send(err);}
		return res.status(200).send(result);		
	})	
});

router.get('/:name',function(req,res){
	contenttype_api.getcontenttypebyname(req.params.name,function(err,result){
		if(err){ return res.status(400).send(err);}
		return res.status(200).send(result);		
	})	
});

router.post('/:name',function(req,res){
    utils.havepermission(req, 'administration', ['content types'], function(permission) {
        if (permission) {
			req.body.machine_name = req.params.name;
			contenttype_api.createcontenttype(req.body,function(err,result){
				if(err){ return res.status(400).send(err);}
				return res.status(200).send(result);		
			})
        } else {
            return res.status(400).send('Permission Denied');
        }
    })

});

router.put('/:name',function(req,res){
    utils.havepermission(req, 'administration', ['content types'], function(permission) {
        if (permission) {

			req.body.machine_name ? delete req.body.machine_name : null;
			//get previous first 
			contenttype_api.getcontenttypebyname(req.params.name,function(err,result){
				if(err){ return res.status(400).send(err);}
				result.label = req.body.label;
				result.comments = req.body.comments;
				result.publish = req.body.publish;
				
				//now save with updated contents
				contenttype_api.updatecontenttype(req.params.name,result,function(err,result){
					if(err){ return res.status(400).send(err);}
					return res.status(200).send(result);		
				})	
			})
        } else {
            return res.status(400).send('Permission Denied');
        }
    })

});

router.delete('/:name',function(req,res){
    utils.havepermission(req, 'administration', ['content types'], function(permission) {
        if (permission) {
			contenttype_api.deletecontenttype(req.params.name,function(err,result){
				if(err){ return res.status(400).send(err);}
				return res.status(200).send(result);		
			})
        } else {
            return res.status(400).send('Permission Denied');
        }
    })	
});


router.get('/:name/field/:field_name',function(req,res){
	contenttype_api.getfield(req.params.name,req.params.field_name,function(err,result){
		console.log("contents field",result);
		if(err){ return res.status(400).send(err);}
		return res.status(200).send(result);		
	})	

});

router.post('/:name/field/:field_name',function(req,res){
    utils.havepermission(req, 'administration', ['content types'], function(permission) {
        if (permission) {
			req.body.machine_name = req.params.field_name;
			contenttype_api.createfield(req.params.name,req.body,function(err,result){
				if(err){ return res.status(400).send(err);}
				return res.status(200).send(result);		
			})
        } else {
            return res.status(400).send('Permission Denied');
        }
    })	

});

router.put('/:name/field/:field_name',function(req,res){
    utils.havepermission(req, 'administration', ['content types'], function(permission) {
        if (permission) {	
			req.body.machine_name = req.params.field_name;
			contenttype_api.updatefield(req.params.name,req.params.field_name,req.body,function(err,result){
				if(err){ return res.status(400).send(err);}
				return res.status(200).send(result);		
			})
        } else {
            return res.status(400).send('Permission Denied');
        }
    })
});

router.delete('/:name/field/:field_name',function(req,res){
    utils.havepermission(req, 'administration', ['content types'], function(permission) {
        if (permission) {
			contenttype_api.deletefield(req.params.name,req.params.field_name,function(err,result){
				if(err){ return res.status(400).send(err);}
				return res.status(200).send(result);		
			})
        } else {
            return res.status(400).send('Permission Denied');
        }
    })
});


module.exports = router;