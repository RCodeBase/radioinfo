app.controller('loginCtrl', ['$scope','$state','$rootScope','$storage','servercalls', function($scope,$state,$rootScope,$storage,servercalls){
	$scope.user = {};
	$scope.error='';

	$scope.login = function(){
		servercalls.post('/api/users/login',$scope.user,function(err,result){
			console.log("on login user result",result);
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
				$rootScope.loggedInUser = result;
				$state.go('dashboard');
			}
		})
	}
}])