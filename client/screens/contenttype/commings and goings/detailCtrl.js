app.controller('c_and_g_detailCtrl', ['$scope','$state','servercalls','$sce', function($scope,$state,servercalls,$sce){
	$scope.content = {};
	console.log("comming and going state",$state);
	servercalls.get('/api/content/'+$state.params.title, {}, function(err, data){
		if(err){
			console.log("err",err);
		}else{
			console.log("data in detail",data);
			$scope.content.title = data.title;
			$scope.content.body = data.fields.body.data;
			$scope.content.image = data.fields.image.url;
			$scope.content.created_on = data.created_on;
			// //$scope.content.category = data.fields.category[0].label;
		}
		
	})
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