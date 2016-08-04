app.controller('profileCtrl', ['$scope','servercalls','$state','$storage','$rootScope', function($scope,servercalls,$state,$storage,$rootScope){
	$scope.user = {};
	$rootScope.$emit('SucessMessage', {});
	
	var storage = $storage('radioinfo');
	var user = storage.getItem('user');
	// console.log("storage profile",storage);
	servercalls.get('/api/users/'+user._id, {}, function(err, result){
		if(err){
			console.log("err",err);
		}else{
			$scope.user = result;
			console.log("profile result",result);
		}
	})

	$scope.save = function() {
	    if ($scope.user.password != undefined || $scope.user.password1 != undefined) {
	        console.log('any password exist' ,$scope.user);
	        if ($scope.user.password == $scope.user.password1) {
	        	$scope.user.local.password = $scope.user.password;
	        } else {
	            $scope.error = ['Password doesn\'t match '];
	        }
	    }
        console.log("user profile update is called",$scope.user);
        servercalls.put('/api/users/' +user._id, $scope.user, function(err, result) {
            if (err) {
                err.ermessage ? $scope.error = err.ermessag : "";
                console.log(err);
                return;
            } else {
            	if(result._id == user._id){
	            	$rootScope.loggedInUser = result;
	            	storage.setItem('user', result);
	            	$state.go('index.home').then(function(){
		            	$rootScope.$emit('SucessMessage', {sm : 'User updated sucessfully'});
	            	}
		            )
            	}
            }
        })	    
	}
}])