app.controller('HomeCtrl', ['$scope','servercalls','dialogs','$state','$rootScope', function($scope, servercalls,dialogs,$state,$rootScope){
	$rootScope.pagetitle = "Dashboard";
	$rootScope.menuname = "dashboard";
	$rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li>";

	$scope.contents = 0;
	$scope.users = 0;
	servercalls.get('/api/content/all/count',{},function(err,result){
		if(err){dialogs.openErrorDialog(JSON.stringify(err));return ;}
		$scope.contents = result;
	});

	servercalls.get('/api/users/all/count',{},function(err,result){
		if(err){dialogs.openErrorDialog(JSON.stringify(err));return ;}
		$scope.users = result;
	});

	
}]);