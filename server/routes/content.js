var express = require('express') ,
	router = express.Router(),
	content_api = require('../libs/content/content_api');
	utils = require('../utils');

router.get('/all',function(req,res){
	var Query = {};
	if(Object.keys(req.query).length  > 0){
		Query = JSON.parse(req.query.query);
	}
	content_api.getcontents(Query , function(err,result){
		if(err){ return res.status(400).send(err);}
		return res.status(200).send(result);	
	})
})
router.get('/jobs',function(req,res){
	var Query = {};
	if(Object.keys(req.query).length  > 0){
		Query = JSON.parse(req.query.query);
	}
	content_api.getjobs(Query , function(err,result){
		if(err){ return res.status(400).send(err);}
		return res.status(200).send(result);	
	})
})

router.get('/all/count',function(req,res){

	var Query = {};
	if(Object.keys(req.query).length  > 0){
		Query = JSON.parse(req.query.query);
	}

	content_api.contentscount(Query, function(err,data){

		if(err){return  res.status(400).send(err);}

		return res.status(200).json(data);
	})
})

router.get('/:machine_name',function(req,res){
	content_api.getcontentbyname(req.params.machine_name,function(err,result){
		if(err){ return res.status(400).send(err);}
		return res.status(200).send(result);	
	})
})

router.post('/create',function(req,res){
    utils.havepermission(req, 'content', ['administration content','create '+req.body.contenttype_machine_name], function(permission) {
        if (permission) {

			req.body.creator = req.user._id;
			content_api.createcontent(req.body,function(err,result){
				if(err){ return res.status(400).send(err);}
				return res.status(200).send(result);	
			})
        } else {
            return res.status(400).send('Permission Denied');
        }
    })

})

router.put('/:machine_name',function(req,res){
    utils.havepermission(req, 'administration', ['content','edit any '+req.params.machine_name], function(permission) {
        if (permission) {
			delete req.body.machine_name;
			content_api.updatecontent(req.params.machine_name, req.body,function(err,result){
				if(err){return res.status(400).send(err);}
				return res.status(200).send(result);	
			})
        } else {
            return res.status(400).send('Permission Denied');
        }
    })
})

router.delete('/:machine_name',function(req,res){
   utils.havepermission(req, 'administration', ['content','delete any '+req.params.machine_name], function(permission) {
        if (permission) {
			content_api.deletecontent(req.params.machine_name,function(err,result){
				if(err){ return res.status(400).send(err);}
				return res.status(200).send(result);	
			})
        } else {
            return res.status(400).send('Permission Denied');
        }
    })
})

// Comment Work 
router.post('/comment/:machine_name',function(req,res){
	if(req.user){
		//console.log("comment in content.js",req.body);
		content_api.savecomment(req.params.machine_name,req.body,function(err,result){
			if(err){ return res.status(400).send(err);}
			return res.status(200).send(result);	
		})		
	}else{
		 return res.status(400).send("Login Required");
	}
})

// router.put('/comment/:machine_name',function(req,res){
// 	delete req.body.machine_name;
// 	console.log("save comment",req.body);
// 	content_api.updatecomment(req.params.machine_name, req.body,function(err,result){
// 		if(err){ 
// 			console.log("error",err);
// 			return res.status(400).send(err);}
// 		return res.status(200).send(result);	
// 	})
// })

// router.delete('/comment/:machine_name',function(req,res){
// 	content_api.deletecomment(req.params.machine_name,function(err,result){
// 		if(err){ return res.status(400).send(err);}
// 		return res.status(200).send(result);	
// 	})
// })


module.exports = router;