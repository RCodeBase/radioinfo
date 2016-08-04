var ua = require('universal-analytics');
var visitor = ua('UA-74728471-1');
module.exports =function(app,basepath){
	
	
	app.post("/api/analytics/visit",function(req,res){
		visitor.pageview(req.body.url, req.body.state, "http://lr.com", function (err) {
			if(err){return res.status(402).send(err);}
			return res.status(200).send('Send call to google');
		})
	});
}
