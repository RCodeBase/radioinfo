app.controller('loginCtrl', ['$scope','$state','servercalls','$storage','$rootScope', function($scope,$state,servercalls,$storage,$rootScope){

	$scope.user = {};
	$scope.error='';
	var storage = $storage('radioinfo');
	var user = storage.getItem('user');
	if(user){
		$state.go('index.home');
	}
	if($state.params.token  && $state.params.email){
		servercalls.post('/api/users/verify/'+$state.params.email+'/'+$state.params.token,{},function(err,result){
			if(err){console.log('eeeeeee',err);return}
			else{
				if(result._id){
					$scope.message = " verification Done..";
				}else{
					$scope.message = "Something is Wrong";	
				}
			}
		})
	}

	$scope.forgotPassword = function(){
		var config = {
			'filter' : {
				'local.email' : $scope.user.email
			}
		};
		console.log("forgotPassword", $scope.user);
		servercalls.get('/api/users/reset/password', config, function(err, result){
			if(err){
				$scope.error= err;
				console.log("-----",err);
			}else{
				console.log("result",result);
			}
		})
	}

	$scope.login = function(){
		console.log("loginCtrl");
		$scope.message= '';
		servercalls.post('/api/users/login',$scope.user,function(err,result){
			if(err){
				if(err.ermessage){
					$scope.error = err.ermessage.username ? err.ermessage.username : err.ermessage.password;
				}else{
					console.log("error in rest api, see console on server",err);
				}
				return;
			}else{
				var storage = $storage('radioinfo');
				storage.setItem('user', result);
				console.log("root scpoe",$rootScope);
				$rootScope.loggedInUser = result;
				$state.go('index.home');
			}
		})
	}



}]);