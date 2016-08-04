app.controller('installCtrl', ['$scope','servercalls','dialogs','$state', function($scope, servercalls,dialogs,$state){
	$scope.user = {};
	servercalls.post('/api/install/is_on',{},function(err,result){
		if(err){
			dialogs.openErrorDialog("Permission Denied");
		}else{
			$scope.haspermission = true;
		}
	});
	
$scope.installation = function(){
	if($scope.user.local.password == $scope.user.local.confirm){
		dialogs.openConfirmDialog('Are you sure for Installation','Please confirm that you want a new installtion of data and do not care if old data exist and get deleted.....',function(yes,no){
			if(yes){
				delete $scope.user.local.confirm;
				servercalls.post('/api/install',$scope.user,function(err,result){
					if(err){
						dialogs.openErrorDialog("You can not install till you change setting in db file");
					}else{
						dialogs.openMessageDialog('Installation Done <br> Please change db setting for stop installation again');
						$state.go('login');
					}
				});
			}
		})
	}else{
		$scope.error = "Passwords not match";
	}
}

}]);