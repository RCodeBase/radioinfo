app.controller('usersCtrl', ['$scope','servercalls','$state','dialogs','$rootScope','$compile','utils', function($scope, servercalls,$state,dialogs,$rootScope,$compile, utils){
	$rootScope.pagetitle = "Users";
	$rootScope.menuname = "users";
	$rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li> <li><a ui-sref='dashboard.users'>Users</a></li>";

	//default config for pagination work
	var count = 0;
	var currentpage = 1;
	var limit = 5; 
	//get fields for showing
	$scope.config = {
	'fields' : {'local.username' : 1,'local.email' : 1,'last_login':1},
	'filter':{isadmin : false},
		'skip' : 0,
		'limit' : limit,
	};
	$scope.user = {};
	$scope.user.local ={username : '',email:''};

	//get total count of users
	servercalls.get('/api/users/all/count',{},function(err,result){
		if(err){console.log(err);return;}
		else{
			count = result;
		}
	})

	//get current page count
	$scope.getPage =function(){
		return currentpage;
	}
	//get total pages count
	$scope.getTotalPages = function(){
		return Math.ceil(count / $scope.config.limit);
	}

	//grid fields definition
	$scope.usersGrid= {
     	paginationPageSize: 5,
     	useExternalPagination: true,
		columnDefs : [
		{displayName : "Username" , field : "local.username"},
		{displayName : "Email" , field : "local.email"},
		{displayName : "Last Login" , field : "last_login"},
		{displayName : "Operations" , field : "operations",cellTemplate: '<button ng-click="grid.appScope.edituser(row.entity)" class="btn btn-xs btn-primary table_btns">Edit</button><button class="btn btn-xs btn-primary table_btns" ng-click="grid.appScope.deleteuser(row.entity,rowRenderIndex)">Delete</button>',enableSorting: false },
		]
	}

	//default set users
	get_users();

//edit page
	$scope.edituser =  function(user){
		 $state.go('dashboard.users_edit', {'uid': user._id});
	};

//Delete user
	$scope.deleteuser =  function(user, index){
	console.log(user);
		dialogs.openConfirmDialog('Are you sure want to delete user? :<b> '+user.local.username+'</b>','', function(yes,no){
	      if(no){
	        console.log("Delete user account");
	        return;
	      }else{
	      	servercalls.delete('/api/users/'+user._id,function(err,result){
				if(err){
					if(err == 'Permission Denied'){dialogs.openErrorDialog(err);return;}
					$scope.error = err; console.log(err); return;}
				else{
					$scope.usersGrid.data.splice(index,1);
				}
			})
	      }
	    })		
	}



//next page work
	$scope.nextPage = function(){
		if(currentpage < $scope.getTotalPages()){
			currentpage++;
			$scope.config.skip = $scope.config.skip + limit;
			get_users();	
		}
	}
//previous page work
	$scope.previousPage = function(){
		if(currentpage > 1 ){
			currentpage--;
			$scope.config.skip = $scope.config.skip - limit;
			get_users();	
		}
	}
// Search user by name or email
	$scope.searchUser = function(){

		delete $scope.config.searchEmail;
		delete $scope.config.searchName;

		if($scope.user.local.username != ''){
			$scope.config.searchName =  $scope.user.local.username;
		}
		else if($scope.user.local.email != ''){
			$scope.config.searchEmail = $scope.user.local.email;
			
		}
		servercalls.get('/api/users/all',$scope.config,function(err,result){
				if(err){
					$scope.error = err; console.log(err);
					return;
				}else{
					$scope.usersGrid.data = result;
					// $scope.user.local.username = '';
					// $scope.user.local.email = '';
				}
			})
	}

	$scope.disableFilter = function(){
		delete $scope.config.searchEmail;
		delete $scope.config.searchName;
		$scope.user.local ={};
		get_users();
	}

function get_users(){
	servercalls.get('/api/users/all',$scope.config,function(err,result){
		if(err){$scope.error = err; console.log(err); return;}
		else{
			result.forEach(function(user){
				console.log('login ---',user.last_login);
				user.last_login ? user.last_login = utils.timeAgo(user.last_login) : user.last_login = 'never';
			})
			$scope.usersGrid.data = result;
		}
	})
}


}]);
