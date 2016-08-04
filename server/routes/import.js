var express = require('express'),
	router = express.Router(),
	fs = require('fs'),
    request = require('request'),
    _ = require("underscore"),
    content_db= require('../libs/content/content_db'),
    taxonomy_db= require('../libs/taxonomy/taxonomy_db');

var basePath = "public/image/news";

var importing = false;

//download file from live url 
var download = function(uri, callback) {
  var file = uri.split('/')[uri.split('/').length - 1];
  request.head(uri, function(err, res, body) {
    var r = request(uri).pipe(fs.createWriteStream(basePath +"/"+ file));
    r.on('close',function(){
    	callback(basePath +"/"+ file , file);
	});
    r.on('error', error);
  });
};

// console err if err error during upload of file
var error = function(message) {
  console.log(message);
};

//create machine name for title for saving
var create_machine_name  =function(data){
	if(data == undefined){
		return "";
	}
	  var string = data.replace(/ /g,"_").toLowerCase();
      string = string.replace(/[^a-z0-9_]/g, '');
      return string;
};


//taxonomy import
router.get('/taxonomy',function(req,res){
	var url = "https://www.radioinfo.com.au/endpoint/taxonomy";

	request(url, function (error, response, body) {
		var alldata  = eval(body);
		var insertJSON = {};
		alldata.forEach(function(data){
			if(!insertJSON[data.machine_name]){
				insertJSON[data.machine_name] = {};
				insertJSON[data.machine_name].terms = new Array();
			}
			insertJSON[data.machine_name].machine_name= data.machine_name;
			insertJSON[data.machine_name].label= data.vocabulary_name;
			var term_json = {};
			term_json.label = data.term_name.replace('&amp;',"&").replace('&lt;',"<").replace('&gt;',">");
			term_json.machine_name = create_machine_name(term_json.label);
			insertJSON[data.machine_name].terms.push(term_json);
		})

		var final_json  = [];
		// //three json which do not have data if required then push these also 
		// var CatalogJSON = {label:"Catalog",machine_name :"catalog",terms : []};
		// var CatalogJSON = {label:"Catalog",machine_name :"catalog",terms : []};
		// var CatalogJSON = {label:"Tags",machine_name :"tags",terms : []};
		
		for(var key in insertJSON){
			final_json.push(insertJSON[key]);
		}

		taxonomy_db.create(final_json,function(err,result){
			if(err){console.log(err);return;}
			else{
				res.status(200).send("Taxonomy created");
			}
		})
	});

});
// blog import
router.get('/blogPost',function(req,res){
	var url = "https://www.radioinfo.com.au/endpoint/getBlogPost?offset=10&limit=10";
		// console.log(newobj);
		var taxonomy_json = {};
		taxonomy_db.find({ machine_name: "blog_category" },{terms:1,machine_name:1},function(err,result){
		if(err){
			return res.send('err');
		}
		result.forEach(function(taxonomy){
			taxonomy_json[taxonomy.machine_name] = taxonomy.terms;
		})

		//console.log("taxonomy_json",taxonomy_json);

		if(req.user._id && !importing){
			request(url, function (error, response, body) {
			var nodes =	eval(body);
			// console.log("eval nodes",nodes);
			// console.log('nodes length ',nodes.length);
			importing = true;
				getblogpostrecursive(nodes,taxonomy_json,req.user._id,[],function(err,result){
					if(err){importing = false; return res.status(400).send(err)}
					importing = false;
					return res.status(200).send(result);
				})
			});
		}else{
			 res.status(200).send("login required");
		}
	})
});
function getblogpostrecursive(newsjson,taxonomy_json,uid,result_array ,cb ){
	console.log('data length',newsjson.length);
	if(newsjson.length > 0){
		var singlenews = newsjson[0];
		console.log('importing blog',singlenews);
		var news_obj = {};
		news_obj.contenttype_machine_name = 'blog_post';	
		news_obj.contenttype = "56d7d8cbe48828d12126195a";
		news_obj.title = decodeURIComponent(singlenews.title);
		news_obj.machine_name = create_machine_name(news_obj.title);
		news_obj.creator = uid;
		news_obj.created_on = Date.now();
		news_obj.comments = true;
		news_obj.publish =true;

		news_obj.fields = {};

		news_obj.fields.blog_category = [];
		console.log("singlenews blog_category",singlenews.blog_category);
		if(singlenews.blog_category){
			var newobj = _.findWhere(taxonomy_json.blog_category , {label : singlenews.blog_category.replace('&amp;',"&").replace('&lt;',"<").replace('&gt;',">")})
			news_obj.fields.blog_category.push(newobj);
		}

		news_obj.fields.description = {};
		news_obj.fields.description.type = 'ckeditor';
		news_obj.fields.description.data = singlenews.body;
		
 		//news_obj.fields.image = {};
		if(singlenews.image){
			download(singlenews.image,function(url, filename){
				news_obj.fields.image.filename = decodeURIComponent(filename);
				news_obj.fields.image.url = decodeURIComponent(url.replace('public',""));
					//push nid
					console.log('bi',news_obj);
				content_db.create(news_obj,function(err,result){
					console.log('err durinf insert',err);
					newsjson.shift();
					getblogpostrecursive(newsjson,taxonomy_json ,uid,result_array ,cb);
					// res.send('1 node inserted');
				})

			});
		}else{
				content_db.create(news_obj,function(err,result){
					console.log('err during insert',err);
					newsjson.shift();
					getblogpostrecursive(newsjson,taxonomy_json ,uid,result_array ,cb);
					// res.send('1 node inserted');
				})

		}
	}else{
		cb(null, result_array);
	}
}

// Brain trust import
router.get('/brainTrust',function(req,res){
	var url = "https://www.radioinfo.com.au/endpoint/getBraintrustPanalist?limit=40";
		// console.log(newobj);
		if(req.user._id && !importing){
			request(url, function (error, response, body) {
			var nodes =	eval(body);
			console.log("eval nodes",nodes);
			console.log('nodes length ',nodes.length);
			importing = true;
				getbraintrustrecursive(nodes,req.user._id,[],function(err,result){
					if(err){importing = false; return res.status(400).send(err)}
					importing = false;
					return res.status(200).send(result);
				})
			});

		}else{
			 res.status(200).send("login required");
		}
});
function getbraintrustrecursive(newsjson ,uid,result_array ,cb ){
	console.log('data length',newsjson.length);
	if(newsjson.length > 0){
		var singlenews = newsjson[0];
		console.log('1111',singlenews);
		var news_obj = {};
		news_obj.contenttype_machine_name = 'brain_trust_panelist';	
		news_obj.contenttype = "56d6c127297425482e97534f";
		news_obj.title = decodeURIComponent(singlenews.title);
		news_obj.machine_name = create_machine_name(news_obj.title);
		news_obj.creator = uid;
		news_obj.created_on = Date.now();
		news_obj.comments = false;
		news_obj.publish =true;
		console.log("job_title",singlenews.job_Title);
		console.log("work_place",typeof singlenews.work_Place);

		news_obj.fields = {};
		if(typeof singlenews.work_Place == 'object'){
			console.log("work_Place is empty");
			news_obj.fields.work_place = "";
		}else{
			news_obj.fields.work_place = singlenews.work_Place ? singlenews.work_Place : "";
		}
		news_obj.fields.job_title = singlenews.job_Title ? singlenews.job_Title : "";
		
 		news_obj.fields.image = {};
		if(singlenews.image){
			download(singlenews.image,function(url, filename){
				news_obj.fields.image.filename = decodeURIComponent(filename);
				news_obj.fields.image.url = decodeURIComponent(url.replace('public',""));
					//push nid
					console.log('bi',news_obj);
				content_db.create(news_obj,function(err,result){
					console.log('err durinf insert',err);
					newsjson.shift();
					getbraintrustrecursive(newsjson ,uid,result_array ,cb);
					// res.send('1 node inserted');
				})

			});
		}else{
				content_db.create(news_obj,function(err,result){
					console.log('err durinf insert',err);
					newsjson.shift();
					getbraintrustrecursive(newsjson ,uid,result_array ,cb);
					// res.send('1 node inserted');
				})

		}
	}else{
		cb(null, result_array);
	}
}
//Advertisement import
router.get('/advertisement',function(req,res){
	var url = "https://www.radioinfo.com.au/endpoint/getadvertisement?limit=40";
		// console.log(newobj);
		if(req.user._id && !importing){
			request(url, function (error, response, body) {
			var nodes =	eval(body);
			console.log('nodes length ',nodes.length);
			importing = true;
				getadvertisementrecursive(nodes,req.user._id,[],function(err,result){
					if(err){importing = false; return res.status(400).send(err)}
					importing = false;
					return res.status(200).send(result);
				})
			});

		}else{
			 res.status(200).send("login required");
		}
});


function getadvertisementrecursive(newsjson ,uid,result_array ,cb ){
	console.log('1',newsjson.length);
	if(newsjson.length > 0){
		var singlenews = newsjson[0];
		console.log('1111',singlenews);
		var news_obj = {};
		news_obj.contenttype_machine_name = 'advertisement';	
		news_obj.contenttype = "56cab2aab0ce47c40a611ac9";
		news_obj.title = decodeURIComponent(singlenews.title);
		news_obj.machine_name = create_machine_name(news_obj.title);
		news_obj.creator = uid;
		news_obj.created_on = Date.now();
		news_obj.comments = false;
		news_obj.publish =true;

		news_obj.fields = {};
		news_obj.fields.mail_to_link = singlenews.mail_to_link? singlenews.mail_to_link : "";
		news_obj.fields.link = singlenews.link ? singlenews.link : "";
 		
 		news_obj.fields.banner_position = singlenews.banner_position ? decodeURIComponent(singlenews.banner_position).toLowerCase().replace('&amp;',"&") : ""; 

		news_obj.fields.banner_image = {};
		if(singlenews.image){
			download(decodeURIComponent(singlenews.image),function(url, filename){
				news_obj.fields.banner_image.filename = decodeURIComponent(filename);
				news_obj.fields.banner_image.url = decodeURIComponent(url.replace('public',""));
					//push nid
					console.log('bi',news_obj);
				content_db.create(news_obj,function(err,result){
					console.log('err durinf insert',err);
					newsjson.shift();
					getadvertisementrecursive(newsjson ,uid,result_array ,cb);
					// res.send('1 node inserted');
				})

			});
		}else{
				content_db.create(news_obj,function(err,result){
					console.log('err durinf insert',err);
					newsjson.shift();
					getadvertisementrecursive(newsjson ,uid,result_array ,cb);
					// res.send('1 node inserted');
				})

		}
	}else{
		cb(null, result_array);
	}
}


//New job vacancy import
router.get('/newjobvacancy',function(req,res){
	var url = "https://www.radioinfo.com.au/endpoint/newjobvacancy?limit=60";
		// console.log(newobj);
			if(req.user._id && !importing){
				request(url, function (error, response, body) {
					console.log(body);
				var nodes =	eval(body);
				console.log('nodes length ',nodes.length);
	
				importing = true;
				taxonomy_db.findOne({machine_name: 'country'},function(err,result){
					var terms = result.terms;
				
					content_db.find({contenttype_machine_name : 'station'},function(err,result){
						var stations = result;
							getnewjobrecursive(nodes,terms,stations,req.user._id,[],function(err,result){
								if(err){importing = false; return res.status(400).send(err)}
								importing = false;
								return res.status(200).send(result);
							})
					})

				})

				});

			}else{
				 res.status(200).send("login required");
			}
});


function getnewjobrecursive(newsjson ,terms,stations,uid,result_array ,cb ){
	console.log('1',newsjson.length);
	if(newsjson.length > 0){
		var singlenews = newsjson[0];
		var news_obj = {};
		news_obj.contenttype_machine_name = 'new_job_vacancy';	
		news_obj.contenttype = "56d0330b2c027f7539f4684b";
		news_obj.title = decodeURIComponent(singlenews.title);
		news_obj.machine_name = create_machine_name(news_obj.title);
		news_obj.creator = uid;
		news_obj.created_on = Date.now();
		news_obj.comments = false;
		news_obj.publish =true;

		news_obj.fields = {};
		news_obj.fields.email = singlenews.email ? singlenews.email : "";
		news_obj.fields.location_name = singlenews.name ? singlenews.name : "";
		news_obj.fields.start_date = singlenews.start_date? Date(singlenews.start_date) : "";
		news_obj.fields.start_date = singlenews.apply_before? Date(singlenews.apply_before) : "";
		news_obj.fields.text_only = singlenews.text_only ? singlenews.text_only : "";

console.log('------------------------------------------------');
        var reference = _.findWhere(stations, { machine_name: create_machine_name(decodeURIComponent(singlenews.station)) })
        if (reference && reference._id) {
            var newobj = {}
            newobj._id = reference._id;
            newobj.title = reference.title;
            newobj.machine_name = reference.machine_name;
            news_obj.fields.station = [newobj];
        }


		news_obj.fields.description = {};
		news_obj.fields.description.type = 'ckeditor';
		news_obj.fields.description.data = singlenews.description;

		news_obj.fields.pdf = {};
		if(singlenews.pdf){
			download(singlenews.pdf,function(url, filename){
				news_obj.fields.pdf.filename = decodeURIComponent(filename);
				news_obj.fields.pdf.url = url.replace('public',"");
					//push nid

				content_db.create(news_obj,function(err,result){
					console.log('err durinf insert',err);
					newsjson.shift();
					getnewjobrecursive(newsjson ,terms,stations,uid,result_array ,cb );
					// res.send('1 node inserted');
				})

			});
		}else{
				content_db.create(news_obj,function(err,result){
					console.log('err durinf insert',err);
					newsjson.shift();
				getnewjobrecursive(newsjson ,terms,stations,uid,result_array ,cb );
					// res.send('1 node inserted');
				})

		}

	}else{
		cb(null, result_array);
	}
}








//Hot News import import
router.get('/hotnews',function(req,res){
	var url = "https://www.radioinfo.com.au/endpoint/gethotnews?limit=15";
		// console.log(newobj);
			if(req.user._id && !importing){
				request(url, function (error, response, body) {
				var nodes =	eval(body);
				console.log('nodes length ',nodes.length);
				importing = true;
					gethotnewsrecursive(nodes,req.user._id,[],function(err,result){
						if(err){importing = false; return res.status(400).send(err)}
						importing = false;
						return res.status(200).send(result);
					})
				});

			}else{
				 res.status(200).send("login required");
			}
});



function gethotnewsrecursive(newsjson ,uid,result_array ,cb ){
	console.log('1',newsjson.length);
	if(newsjson.length > 0){
		var singlenews = newsjson[0];
		console.log('1111',singlenews);
		var news_obj = {};
		news_obj.contenttype_machine_name = 'hot_news';	
		news_obj.contenttype = "56cff131c25950560b503c80";
		news_obj.title = decodeURIComponent(singlenews.title);
		news_obj.machine_name = create_machine_name(news_obj.title);
		news_obj.creator = uid;
		news_obj.created_on = Date.now();
		news_obj.comments = false;
		news_obj.publish =true;

		news_obj.fields = {};
		news_obj.fields.paywall = singlenews.paywall == '1' ?"true" : "false" ;
		news_obj.fields.show_on_homepage = singlenews.show_on_homepage == '1' ? "true" : "false";
		news_obj.fields.source = singlenews.source? singlenews.source : "";
		news_obj.fields.link = singlenews.link ? singlenews.link : "";

		news_obj.fields.description = {};
		news_obj.fields.description.type = 'ckeditor';
		news_obj.fields.description.data = singlenews.body;


		news_obj.fields.image = {};
		singlenews.image = decodeURIComponent(singlenews.image);
		download(singlenews.image,function(url, filename){
			news_obj.fields.image.filename = decodeURIComponent(filename);
			news_obj.fields.image.url = url.replace('public',"");
			
			//push nid
			result_array.push(singlenews.nid);
			content_db.create(news_obj,function(err,result){
				console.log('err durinf insert',err);
				newsjson.shift();
				gethotnewsrecursive(newsjson ,uid,result_array ,cb);
				// res.send('1 node inserted');
			})

		});

	}else{
		cb(null, result_array);
	}
}




//Stations import
router.get('/station',function(req,res){
	var url = "https://www.radioinfo.com.au/endpoint/getstation?offset=300&limit=100";
		// console.log(newobj);
			if(req.user._id && !importing){
				request(url, function (error, response, body) {
				var nodes =	eval(body);
				console.log('nodes length ',nodes.length);
				importing = true;
					content_db.find({contenttype_machine_name : "station_market"},function(err,station_market){
						if(err){importing = false; return res.status(400).send(err)}

						getstationrecursive(nodes,station_market,req.user._id,[],function(err,result){
							if(err){importing = false; return res.status(400).send(err)}
							importing = false;
							return res.status(200).send(result);
						})

					})
				});

			}else{
				 res.status(200).send("login required");
			}
});


function getstationrecursive(newsjson, station_market, uid, result_array, cb) {
    console.log('1', newsjson.length);
    if (newsjson.length > 0) {
        var singlenews = newsjson[0];

        // console.log('1111',singlenews);

        var news_obj = {};
        news_obj.contenttype_machine_name = 'station';
        news_obj.contenttype = "56d40f1feab2e77f373c170d";
        news_obj.title = decodeURIComponent(singlenews.title);
        console.log('title -------------------', news_obj.title);
        news_obj.machine_name = create_machine_name(news_obj.title);
        news_obj.creator = uid;
        news_obj.created_on = Date.now();
        news_obj.comments = false;
        news_obj.publish = true;

        news_obj.fields = {};
        news_obj.fields.surveyed = singlenews.survey == '1' ? "true" : "false";
        news_obj.fields.website = singlenews.website ? singlenews.website : "";

        var reference = _.findWhere(station_market, { machine_name: create_machine_name(decodeURIComponent(singlenews.station_market)) })
        if (reference && reference._id) {

            var newobj = {}
            newobj._id = reference._id;
            newobj.title = reference.title;
            newobj.machine_name = reference.machine_name;
            news_obj.fields.station_market = [newobj];
        }

        news_obj.fields.logo = {};



        if (singlenews.image && singlenews.image != '') {
            singlenews.image = decodeURIComponent(singlenews.image);
            download(singlenews.image, function(url, filename) {
                news_obj.fields.logo.filename = decodeURIComponent(filename);
                news_obj.fields.logo.url = url.replace('public', "");

                //push nid
                result_array.push(singlenews.nid);
                console.log('title 2-------------------', news_obj);
                content_db.create(news_obj, function(err, result) {
                    if (err) {
                        console.log('err durinf insert', err);
                    }
                    newsjson.shift();
                    getstationrecursive(newsjson, station_market, uid, result_array, cb);
                    // res.send('1 node inserted');
                })

            });

        } else {
            result_array.push(singlenews.nid);
            console.log('title 2-------------------', news_obj.title);
            content_db.create(news_obj, function(err, result) {
                if (err) {
                    console.log('err durinf insert', err);
                }
                newsjson.shift();
                getstationrecursive(newsjson, station_market, uid, result_array, cb);
                // res.send('1 node inserted');
            })
        }



    } else {
        cb(null, result_array);
    }
}






//Station Market import
router.get('/stationmarket',function(req,res){
	var url = "https://www.radioinfo.com.au/endpoint/getstationmarket";
		// console.log(newobj);
			if(req.user._id && !importing){
				request(url, function (error, response, body) {
				var nodes =	eval(body);
				console.log('nodes length ',nodes.length);
				importing = true;
					getmarketrecursive(nodes,req.user._id,[],function(err,result){
						if(err){importing = false; return res.status(400).send(err)}
						importing = false;
						return res.status(200).send(result);
					})
				});

			}else{
				 res.status(200).send("login required");
			}
});



function getmarketrecursive(newsjson ,uid,result_array ,cb ){
	console.log('1',newsjson.length);
	if(newsjson.length > 0){
		var singlenews = newsjson[0];
		console.log('1111',singlenews);
		var news_obj = {};
		news_obj.contenttype_machine_name = 'station_market';	
		news_obj.contenttype = "56d424c05cf5186e3f7d897b";
		news_obj.title = decodeURIComponent(singlenews.title);
		news_obj.machine_name = create_machine_name(news_obj.title);
		news_obj.creator = uid;
		news_obj.created_on = Date.now();
		news_obj.comments = false;
		news_obj.publish =true;

		news_obj.fields = {};
			content_db.create(news_obj,function(err,result){
				console.log('err durinf insert',err);
				newsjson.shift();
				getmarketrecursive(newsjson ,uid,result_array ,cb);
				// res.send('1 node inserted');
			})
	}else{
		cb(null, result_array);
	}
}





router.get('/news',function(req,res){
	var url = "https://www.radioinfo.com.au/endpoint/getallnews?limit=40";
		var taxonomy_json = {};
	taxonomy_db.find({ $or: [ { machine_name: "news_category" },{ machine_name: "newstags" }]},{terms:1,machine_name:1},function(err,result){
		if(err){return res.send('err')}
		result.forEach(function(taxonomy){
			taxonomy_json[taxonomy.machine_name] = taxonomy.terms;
		})
		
		// console.log(newobj);
			if(req.user._id && !importing){
				request(url, function (error, response, body) {
				var nodes =	eval(body);

				console.log('nodes length ',nodes.length);
				importing = true;
				getnewsrecursive(nodes,taxonomy_json,req.user._id,[],function(err,result){
					if(err){importing = false; return res.status(400).send(err)}
					importing = false;
					return res.status(200).send(result);

				})
			});

			}else{
				 res.status(200).send("login required");
			}
	})
});

function getnewsrecursive(newsjson ,taxonomy_json,uid,result_array ,cb ){
	console.log('1',newsjson.length);
	if(newsjson.length > 0){
		var singlenews = newsjson[0];
		console.log('1111',singlenews.title);
		var news_obj = {};
		news_obj.contenttype_machine_name = 'news';	
		news_obj.contenttype = "56c44d9df32ce7412fd87e39";
		news_obj.title = decodeURIComponent(singlenews.title);
		news_obj.machine_name = create_machine_name(news_obj.title);
		news_obj.creator = uid;
		news_obj.created_on = Date.now();
		news_obj.comments = true;
		news_obj.publish =true;
		news_obj.fields = {};
		news_obj.fields.image_caption = singlenews.image_caption ? singlenews.image_caption : "",
		news_obj.fields.display_in = singlenews.display_in == "Homepage Slider" ?  'home_slider' : singlenews.display_in == "Homepage List" ? 'home_list' : "" ;
		news_obj.fields.survey = singlenews.survey == '1'? "true" :"false";
		news_obj.fields.subscribers_only = singlenews.subscribers_only == "1" ?"true" : "false";

		news_obj.fields.body = {};
		news_obj.fields.body.type = 'ckeditor';
		news_obj.fields.body.data = singlenews.body;
		news_obj.fields.image = {};

		news_obj.fields.tags = [];
		singlenews.tag.forEach(function(tag){
			var newobj = _.findWhere(taxonomy_json.newstags , {label : tag.replace('&amp;',"&").replace('&lt;',"<").replace('&gt;',">")})
			news_obj.fields.tags.push(newobj);
		})
		news_obj.fields.category = [];
		singlenews.category.forEach(function(tag){
			var newobj = _.findWhere(taxonomy_json.news_category , {label : tag.replace('&amp;',"&").replace('&lt;',"<").replace('&gt;',">")})
			news_obj.fields.category.push(newobj);
		})
		
		singlenews.image = decodeURIComponent(singlenews.image);
		
		download(singlenews.image,function(url, filename){
			news_obj.fields.image.filename = decodeURIComponent(filename);
			news_obj.fields.image.url = url.replace('public',"");
			
			//push nid
			result_array.push(singlenews.nid);
			content_db.create(news_obj,function(err,result){
				console.log('err durinf insert',err);
				newsjson.shift();
				getnewsrecursive(newsjson ,taxonomy_json,uid,result_array ,cb);
				// res.send('1 node inserted');
			})

		});

	}else{
		cb(null, result_array);
	}
}


module.exports =router;