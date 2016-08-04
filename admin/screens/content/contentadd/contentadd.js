app.controller('contentAddCtrl',['$scope','servercalls','$state','dialogs','$rootScope', function($scope,servercalls,$state,dialogs,$rootScope){
  $rootScope.pagetitle = "Add Contents";
  $rootScope.menuname = "contentadd";
  $rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.contentadd'>Contents</a></li>";

	servercalls.get('/api/contenttype/all',{},function(err,result){
		if(err){dialogs.openErrorDialog(err);}
		else{
			$scope.contenttypes = result;
		}
	})

}]);