app.controller('newsdetailCtrl', ['$scope','$state','servercalls','$rootScope', function($scope,$state,servercalls,$rootScope){
	$scope.content = {};
	$scope.postcomment = false;
	$scope.comments = {};
	$scope.comment_length = '';
	$scope.no_user = false;
	$scope.screen_name = '';

	//$scope.workflow_state = "approved";
	//var storage = $storage('radioinfo');
	if($rootScope.loggedInUser){
		$scope.screen_name = $rootScope.loggedInUser.local.username;
	}
	servercalls.get('/api/content/'+$state.params.title, {}, function(err, data){
		if(err){
			console.log("err",err);
		}else{
			
			$scope.content = data;
			console.log("data in news detail",$scope.content);
			$scope.content.title = data.title;
			// $scope.content.body = data.fields.body.data;
			// $scope.content.image = data.fields.image.url;
			// $scope.content.caption = data.fields.image_caption;
			$scope.comment_length = data.user_comments.length;
			if(data.user_comments.length > 0){
				$scope.comments = data.user_comments;
			}
			// //$scope.content.category = data.fields.category[0].label;
		}
		
	})
	$scope.postComment = function(){
		if($rootScope.loggedInUser){
			$scope.postcomment = true;
		}else{
			$scope.no_user = true;
		}		
		//console.log("$scope.postcomment", $scope.postcomment);
	}
}])