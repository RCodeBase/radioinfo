var express = require('express') ,
	router = express.Router(),
	node_weight_api = require('../libs/node_weight/node_weight_api');

router.get('/:type',function(req,res){
	var Query = {};
	if(Object.keys(req.query).length  > 0){
		Query = JSON.parse(req.query.query);
	}
	node_weight_api.getnodeoftype(req.params.type , Query , function(err,result){
		if(err){ return res.status(400).send(err);}
		return res.status(200).send(result);	
	})
})

router.put('/:type',function(req,res){
	node_weight_api.savenodeoftype(req.params.type,req.body, function(err,data){
		if(err){return  res.status(400).send(err);}
		return res.status(200).json(data);
	})
})



module.exports = router;