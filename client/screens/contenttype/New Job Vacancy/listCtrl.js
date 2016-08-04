app.controller('jobslistCtrl', ['$scope','$sce','servercalls', function($scope,$sce,servercalls){
 	$scope.content = {};	
 	$scope.jobList = {};	
	$scope.listType = "Jobs";
	//default config for pagination work
	$scope.count = 0;
	$scope.currentpage =1 ;
	$scope.limit =20;

	$scope.config = {
		filter : {
			'contenttype_machine_name' : 'new_job_vacancy',
			'publish' : 'true'
		},
		'skip' : 0,
	 	'limit' : $scope.limit,
	}
	// show advertisement whose position is Job list
	var job_list_config = {
		filter : {
			'contenttype_machine_name' : 'advertisement',
			'fields.banner_position' : 'jobs list'
		},
		sort : { created_on : -1 },
		limit : "1"
	}
	servercalls.get('/api/content/all', job_list_config, function(err, result){
		if(err){
			console.log("err",err);
		}else{
			//console.log("ads section job_list_config",result);
			$scope.jobList = result[0];
			$scope.jobList.image = result[0].fields.banner_image.url;
			$scope.jobList.link = result[0].fields.link;
		}
	});

	//get total pages count
	function getTotalPages(){
		return $scope.getTotalPages = Math.ceil($scope.count / $scope.config.limit);
	}

	//next page work
	$scope.nextPage = function(){
		if($scope.currentpage < $scope.getTotalPages){
			$scope.currentpage++;
			$scope.config.skip = $scope.config.skip + $scope.limit;
			get_contents();	
		}
	}
	//previous page work
	$scope.previousPage = function(){
		if($scope.currentpage > 1 ){
			$scope.currentpage--;
			$scope.config.skip = $scope.config.skip - $scope.limit;
			get_contents();	
		}
	}

	//for first time contents
	get_contents();
	getcount();

	function get_contents(){
		servercalls.get('/api/content/jobs',$scope.config,function(err,result){
			if(err){$scope.error = err; console.log(err); return;}
			else{
				$scope.content = result;
				// result.forEach(function(item){
				// 	if(item.hasOwnProperty('fields')){
				// 		for(var key in item.fields){							
				// 			if(key == 'station'){
				// 				console.log("key",item.fields[key][0]._id);
				// 			}
				// 		}
				// 		//console.log("item fields",item.fields);
				// 	}
					
				// })
				getcount();
			}
		})
	}

	function getcount(){
		servercalls.get('/api/content/all/count',$scope.config,function(err,result){
			if(err){console.log(err);return;}
			else{
				$scope.count = result;
				getTotalPages();
			}
		})
	}	

}])
