var express = require('express'),
	router = express.Router(),
	utils = require('../utils'),
	taxonomy_api = require('../libs/taxonomy/taxonomy_api');

router.get("/all",function(req,res){
	var Query = {};
	if(Object.keys(req.query).length  > 0){
		Query = JSON.parse(req.query.query);
	}

	taxonomy_api.getalltaxonomy(Query , function(err,result){
		if(err){ return res.status(400).send(err);}
		return res.status(200).send(result);
	})
});

router.get("/:machine_name",function(req,res){
	taxonomy_api.gettaxonomy(req.params.machine_name , function(err,result){
		if(err){ return res.status(400).send('Taxonomy not found');}
		return res.status(200).send(result);
	})
});

router.post("/:machine_name",function(req,res){
    utils.havepermission(req, 'administration', ['taxonomy'], function(permission) {
        if (permission) {

			req.body.machine_name = req.params.machine_name;
			taxonomy_api.createtaxonomy(req.body, function(err,result){
				if(err){ return res.status(400).send(err);}
				return res.status(200).send(result);
			})
     
        } else {
            return res.status(400).send('Permission Denied');
        }
    })
});

router.put("/:machine_name",function(req,res){
    utils.havepermission(req, 'administration', ['taxonomy'], function(permission) {
        if (permission) {

			req.body.machine_name ? delete req.body.machine_name  : null;
			taxonomy_api.updatetaxonomy(req.params.machine_name, req.body, function(err,result){
				if(err){ return res.status(400).send(err);}
				return res.status(200).send(result);
			})
        } else {
            return res.status(400).send('Permission Denied');
        }
    })

});

router.delete("/:machine_name",function(req,res){
    utils.havepermission(req, 'administration', ['taxonomy'], function(permission) {
        if (permission) {
			taxonomy_api.deletetaxonomy(req.params.machine_name , function(err,result){
				if(err){ return res.status(400).send(err);}
				return res.status(200).send('Taxonomy deleted');
			})
        } else {
            return res.status(400).send('Permission Denied');
        }
    })

});

router.put("/:machine_name/updateallterms",function(req,res){
    utils.havepermission(req, 'administration', ['taxonomy'], function(permission) {
        if (permission) {
			taxonomy_api.updateallterms(req.params.machine_name ,req.body, function(err,result){
				if(err){ return res.status(400).send(err);}
				return res.status(200).send(result);
			})
        } else {
            return res.status(400).send('Permission Denied');
        }
    })

});


router.get("/:machine_name/term/:term_machine_name",function(req,res){
			taxonomy_api.getterms(req.params.machine_name , req.params.term_machine_name , function(err,result){
				if(err){ return res.status(400).send(err);}
				return res.status(200).send(result);
			})
});

router.post("/:machine_name/term/:term_machine_name",function(req,res){
    utils.havepermission(req, 'administration', ['taxonomy'], function(permission) {
        if (permission) {
			req.body.machine_name = req.params.term_machine_name;
			taxonomy_api.createterm(req.params.machine_name , req.body, function(err,result){
				if(err){ return res.status(400).send(err);}
				return res.status(200).send(result);
			})
        } else {
            return res.status(400).send('Permission Denied');
        }
    })
});

router.put("/:machine_name/term/:term_machine_name",function(req,res){
    utils.havepermission(req, 'administration', ['taxonomy'], function(permission) {
        if (permission) {
			req.body.term_machine_name ? delete req.body.term_machine_name  : null;
			taxonomy_api.updateterm(req.params.machine_name,req.params.term_machine_name , req.body, function(err,result){
				if(err){ return res.status(400).send(err);}
				return res.status(200).send(result);
			})
        } else {
            return res.status(400).send('Permission Denied');
        }
    })

});

router.delete("/:machine_name/term/:term_machine_name",function(req,res){
    utils.havepermission(req, 'administration', ['taxonomy'], function(permission) {
        if (permission) {
			taxonomy_api.deleteterm(req.params.machine_name, req.params.term_machine_name , function(err,result){
				if(err){ return res.status(400).send(err);}
				return res.status(200).send(result);
			})
        } else {
            return res.status(400).send('Permission Denied');
        }
    })

});


module.exports = router;