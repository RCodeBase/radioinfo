app.controller('questiondetailCtrl', ['$scope','$state','servercalls', function($scope,$state,servercalls){
	$scope.content = {};
	$scope.comment = '';
	servercalls.get('/api/content/'+$state.params.title, {}, function(err, data){
		if(err){
			console.log("err",err);
		}else{
			console.log("data in question detail",data);
			$scope.content.title = data.title;
			$scope.content.name = data.fields.screen_name;
			$scope.content.body = data.fields.question.data;
		}		
	})
	// $scope.postComment = function(){
	// 	console.log("comment",$scope.comment);
	// }
}])