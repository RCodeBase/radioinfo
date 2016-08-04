app.controller('taxonomyCtrl', ['$scope','$state','servercalls', function($scope,$state,servercalls){
	
	$scope.content = {};

	$scope.count = 0;
	$scope.currentpage =1 ;
	$scope.limit =5;
	console.log("state params",$state.params.tax);
	$scope.tax_config = {
		filter : {"fields.category.machine_name" : $state.params.tax},
		'skip' : 0,
		'limit' : $scope.limit
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
				var category = _.findWhere(result[0].fields.category,{machine_name : $state.params.tax});
				$scope.taxonomyType = category.label.replace(new RegExp('-', 'g'),' ');
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

// > db.contents.find({"fields" :{"category":{"machin_name" : {$in : ['creative__production']} }}}).pretty()


//db.contents.find({"fields" :{"category": {$in : [{'machin_name' : 'creative__production'}]} }}).pretty()

// db.contents.find({"fields" :{"category.machine_name" : "creative__production"}}).pretty()


//db.contents.find({"fields.category.machine_name" : "creative__production"}).pretty()
