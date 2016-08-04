app.controller('resetPasswordCtrl', ['$scope','$state','servercalls', function($scope,$state,servercalls){
	$scope.user = {};

	console.log("stateParams",$state.params);
	$scope.resetPassword = function(){
		if($scope.user.local.password == $scope.user.cpassword){
			console.log("password match");
			var config = {
				'filter' : {
					'local.email' : $state.params.eid
				}
			};
			servercalls.get('/api/users/all', config, function(err, result){
				if(err){
					$scope.error = err;
				}else if($state.params.token != result[0].verification_code){
					$scope.error = "User token is invalid";
				}else{
					servercalls.put('/api/users/'+result[0]._id, $scope.user, function(err, result){
						if(err){
							console.log("error while reset the user password");
						}else{

							console.log("password reset successfull");
							$state.go('index.login');
						}
					})
				}
			})
		}else{
			$scope.error = 'Password doesn\'t match ';
		}
	}
}]);