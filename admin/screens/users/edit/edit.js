app.controller('usersEditCtrl', ['$scope','servercalls','$state','$rootScope','$storage','dialogs', function($scope, servercalls,$state,$rootScope,$storage,dialogs){
  $rootScope.pagetitle = "Edit User";
  $rootScope.menuname = "users";
  $rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.users'>Users</a></li>";

	
	var storage = $storage('radioinfo');
//get all roles
	servercalls.get('/api/roles/all', {filter :{machine_name:{$ne : 'anonymous_user'}}}, function(err, result){
		if(err){$scope.error = err;console.log(err);return;
		}else{
			$scope.roles =result;
		}
	})

//get user for edit
	servercalls.get('/api/users/'+$state.params.uid,{},function(err,result){
		if(err){dialogs.openErrorDialog(err);return}
		else{
			result.status = String(result.status);
			$scope.user = result;
		}
	})

//change on checkbox of roles
	$scope.checkboxclick = function(id){
		if($scope.user.roles){
			console.log('in ???');
			var position  = $scope.user.roles.indexOf(id);
			if(position > -1){
				$scope.user.roles.splice(position,1);
			}else{
				$scope.user.roles.push(id);
			}
		}
	}

	$scope.UpdateUser = function() {

		$scope.error = null;
	    if ($scope.user.local.password != undefined || $scope.user.local.confirmPassword != undefined) {
	         if ($scope.user.local.password != $scope.user.local.confirmPassword) {
	        	    $scope.error = ['Password doesn\'t match '];
	        }
	    } 
	        if (!$scope.error){
	        servercalls.put('/api/users/' + $state.params.uid, $scope.user, function(err, result) {
	            if (err) { 
	 				if(err == 'Permission Denied'){
	 					dialogs.openErrorDialog(err);return
	 				}
	            	err.ermessage ? $scope.error = err.ermessag : "";return;}
	            else {
	            	if(result._id == $rootScope.loggedInUser._id){
		            	$rootScope.loggedInUser = result;
		            	storage.setItem('user', result);
	            	}
					dialogs.openMessageDialog('User Updated Successfully');
	                $state.go('dashboard.users');
	            }
	        })
	    }
	   
	}



}]);