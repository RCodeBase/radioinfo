app.controller('usersCreateCtrl', ['$scope','servercalls','dialogs','$state','$rootScope', function($scope, servercalls,dialogs,$state,$rootScope){
  $rootScope.pagetitle = "Create User";
  $rootScope.menuname = "users";
  $rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.users'>Users</a></li>";

	$scope.user={};
	$scope.user.status = "true";
	$scope.user.roles = new Array();

	//get all roles
	servercalls.get('/api/roles/all', {filter :{machine_name:{$ne : 'anonymous_user'}}}, function(err, result){
		if(err){dialogs.openErrorDialog(err);return}
		else{
			$scope.roles =result;
		}
	})

	//change on checkbox of roles
	$scope.checkboxclick = function(id){
		var position  = $scope.user.roles.indexOf(id);
		if(position > -1){
			$scope.user.roles.splice(position,1);
		}else{
			$scope.user.roles.push(id);
		}

	}

	$scope.register = function(){
		if($scope.user.local.password == $scope.user.local.confirmPassword){		
			servercalls.post('/api/users/create',$scope.user,function(err,result){
	            if (err) { 
	 				if(err == 'Permission Denied'){dialogs.openErrorDialog(err);return;}
	            	err.ermessage ? $scope.error = err.ermessag : "";return;}
	            else {
					dialogs.openMessageDialog('User Created Successfully');
					$state.go('dashboard.users');
				}
			})
		}else{
			$scope.error = 'Password doesn\'t match ';
		}
	}
}]);