app.controller('searchCtrl', ['$scope','servercalls',"$state", function($scope,servercalls,$state){
 	$scope.content = {};	
	$scope.listType = "News";
	//default config for pagination work
	$scope.count = 0;
	$scope.currentpage =1 ;
	$scope.limit =5;

	$scope.searchdata = function(){

	}

	$scope.config = {
		filter : {'contenttype_machine_name' : 'news'},
		'skip' : 0,
	 	'limit' : $scope.limit,
	}

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
		servercalls.get('/api/content/all',$scope.config,function(err,result){
			if(err){$scope.error = err; console.log(err); return;}
			else{
				$scope.content = result;
				console.log("news result",result);
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
