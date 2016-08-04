app.controller('jobsdetailCtrl', ['$scope','$state','servercalls','$sce', function($scope,$state,servercalls,$sce){
	$scope.content = {};
	$scope.jobList = {};
	servercalls.get('/api/content/'+$state.params.title, {}, function(err, data){
		if(err){
			console.log("err",err);
		}else{
			console.log("data in jobs",data);
			$scope.content.title = data.title;
			$scope.content.body = data.fields.description.data;
			$scope.content.apply_before = data.fields.apply_before
			// //$scope.content.category = data.fields.category[0].label;
		}
		
	})
	var job_list_config = {
		filter : {
			'contenttype_machine_name' : 'advertisement',
			'fields.banner_position' : 'Job list'
		},
		sort : { created_on : -1 },
		limit : "1"
	}
	servercalls.get('/api/content/all', job_list_config, function(err, result){
		if(err){
			console.log("err",err);
		}else{
			$scope.jobList = result[0];
			$scope.jobList.image = result[0].fields.banner_image.url;
			$scope.jobList.link = result[0].fields.link;
			console.log("ads section job_list_config",result);
		}
	});

	var myVar = setInterval(function(){ 
		
		if($('div[ng-bind-html="content.body"] img').attr('src')){
			clearInterval(myVar);
			$('div[ng-bind-html="content.body"] img').attr('src' ,"https://www.radioinfo.com.au"+$('div[ng-bind-html="content.body"] img').attr('src') );
		}
	}, 10);
	// function findOjb(data){
	// 	for (var key in data) {
	// 	  if (data.hasOwnProperty(key)) {
	// 	  	if(typeof data[key] == 'object' && (key == 'fields' || key == 'body' )){
	// 	  		findOjb(data[key]);
	// 	  		//console.log(key + " -> " + data[key]);
	// 	  	}else{
	// 	  		console.log(key + " -> " + data[key]);

	// 	    	$scope.content[key] = data[key];	
	// 	    	console.log(">>>>>>",$scope.content[key]);	  		
	// 	  	}
	// 	  }
	// 	}
	// }
}])