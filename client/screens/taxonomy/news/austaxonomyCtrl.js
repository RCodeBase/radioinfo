app.controller('austaxonomyCtrl', ['$scope','$state','servercalls','$location', function($scope,$state,servercalls,$location){
	console.log("location",$location.$$url);
	$scope.content = {};
	
	$scope.count = 0;
	$scope.currentpage =1 ;
	$scope.limit =5;

	if($location.$$url == "/news/aus"){
		$scope.taxonomyType = "Australian News";

		$scope.tax_config = {
		filter : {"fields.category.machine_name" : {$nin : ['technology_news','world_news']}, "contenttype_machine_name" : "news"},
		'skip' : 0,
		'limit' : $scope.limit
		}
	}else if($location.$$url == "/news/world"){
		$scope.taxonomyType = "World News";

		$scope.tax_config = {
		filter : {"fields.category.machine_name" : 'world_news', "contenttype_machine_name" : "news"},
		'skip' : 0,
		'limit' : $scope.limit
		}
	}else if($location.$$url == "/news/tech"){
		$scope.taxonomyType = "Technology News";

		$scope.tax_config = {
		filter : {"fields.category.machine_name" : 'technology_news', "contenttype_machine_name" : "news"},
		'skip' : 0,
		'limit' : $scope.limit
		}
	}
	
	//get total pages count
	function getTotalPages(){
		return $scope.getTotalPages = Math.ceil($scope.count / $scope.tax_config.limit);
	}
	//next page work
	$scope.nextPage = function(){
		if($scope.currentpage < $scope.getTotalPages){
			$scope.currentpage++;
			$scope.tax_config.skip = $scope.tax_config.skip + $scope.limit;
			get_contents();	
		}
	}
	//previous page work
	$scope.previousPage = function(){
		if($scope.currentpage > 1 ){
			$scope.currentpage--;
			$scope.tax_config.skip = $scope.tax_config.skip - $scope.limit;
			get_contents();	
		}
	}

	//for first time contents
	get_contents();
	getcount();


	
	function get_contents(){
		servercalls.get('/api/content/all', $scope.tax_config, function(err,result){
			if(err){$scope.error = err; console.log(err); return;}
			else{
				$scope.content = result;
				console.log("news result",result);
				getcount();
			}
		})
	}

	function getcount(){
		servercalls.get('/api/content/all/count', $scope.tax_config, function(err,result){
			if(err){console.log(err);return;}
			else{
				$scope.count = result;
				getTotalPages();
			}
		})
	}
}])

