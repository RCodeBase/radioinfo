app.controller('profileCtrl', ['$scope','servercalls','ngDialog','$state','$rootScope','$storage', function($scope, servercalls,ngDialog,$state,$rootScope,$storage){
	$rootScope.$emit('pageBasic', { pagetitle: "My Profile",breadcrumb:"<li><a href='/#/dashboard'>Dashboard</a></li> <li><a href='/#/dashboard/profile'>Profile</a></li>"});
	$scope.user = $rootScope.loggedInUser;
	console.log('profile',$scope.user);
}]);