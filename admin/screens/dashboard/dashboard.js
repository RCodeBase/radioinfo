app.controller('dashboardCtrl', ['$scope','servercalls','$state','$rootScope','$storage','$compile', function($scope, servercalls,$state,$rootScope,$storage,$compile){
$rootScope.base_path = 'https://server.lr.com'; 
var storage = $storage('radioinfo');
servercalls.get('/api/users/islogin',{},function(err,result){
	console.log("users in dashboardCtrl",result);
	if(err){
		storage.removeItem('user')
	}else{
		storage.setItem('user', result);
		$rootScope.loggedInUser = result;	

	}
})
$scope.logout = function(){
	servercalls.get('/api/users/logout',{},function(err,result){
		if(err){console.log(err);return;}
		else{
			$rootScope.loggedInUser = null;		
			storage.removeItem('user');
			$state.go('login');
		}
	})	

}


}]);