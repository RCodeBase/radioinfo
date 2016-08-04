app.controller('onthisdayCtrl', ['$scope','servercalls','$sce', function($scope,servercalls,$sce){
	$scope.content = {};

	$scope.content.month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	$scope.content.day = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];

	//set the title
	$scope.content.type = "On This Day";
	
	$scope.config = {
		filter : {
			'contenttype_machine_name' : 'on_this_day',
		},
		sort : { created_on : -1 },
		limit : "1"
	}
	getEvents($scope.config);
	function getEvents(data){
		console.log("data",data);
		servercalls.get('/api/content/all', data, function(err, result){
			if(err){
				$scope.error = err;
				console.log("err",err);
			}else if(result.length == 0){
				$scope.error = "There is no Events Added for the selected data."
				$scope.content.body = '';
			}else{
				console.log(" on this day",result);
				$scope.content.body = result[0].fields.text.data;
				$scope.month = result[0].fields.month;
				$scope.day = result[0].fields.day;
			}
		});
	}
	

	$scope.update = function (){
		$scope.error = null;
		//console.log("on update",$scope);
			$scope.config = {
			filter : {
				'contenttype_machine_name' : 'on_this_day',
				'fields.day' : $scope.day,
				'fields.month' : $scope.month,
			},
			sort : { created_on : -1 },
			limit : "1"
		}
		getEvents($scope.config);
	}
	
}])