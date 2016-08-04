app.controller('changePasswordCtrl', ['$scope','servercalls','$state', function($scope,servercalls,$state){
	$scope.user = {};
	$scope.changePassword = function(){
		if($scope.user.npassword == $scope.user.cnpassword){
			console.log($scope.user);
			servercalls.put('/api/users/change/password', $scope.user, function(err, result){
				if(err){
					console.log("error",err);
					$scope.error = err;
				}else{
					$state.go('index.home');
				}
			})
		}else{
			$scope.error = 'Password doesn\'t match ';
		}
	}
}])