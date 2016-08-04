app.controller('permissionsCtrl', ['$scope','servercalls','$state','$rootScope','dialogs', function($scope, servercalls,$state,$rootScope,dialogs){
	$rootScope.pagetitle = "Permissions";
	$rootScope.menuname = "permissions";
	$rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.permissions'>Permissions</a></li>";


	$scope.permissions_types = new Array();

	//get all roles
	servercalls.get("/api/roles/all",{},function(err,result){
		if(err){console.log(err);return;}
		else{
			$scope.roles = result;
		}
	})
	//roles permission get
	servercalls.get("/api/roles/all/permissions",{},function(err,result){
		if(err){console.log(err);return;}
		else{
			$scope.permissions = result;
			console.log("permissions result",result);
			
		}
	})
	//save json
	$scope.savePermissions = function() {
	    var json = {};
	    $scope.roles.forEach(function(role) {
	        var permissions = {};
	        Object.keys($scope.permissions).forEach(function(keyname) {
	        	permissions[keyname] = new Array();
	            $('[for="' + role._id + '"][key="' + keyname + '"]:checked').each(function() {
	                permissions[keyname].push($(this).attr('value'));
	            });

	        })
	        json[role._id] = permissions;
	    })
	    servercalls.put('/api/roles/permissions/updatepermissions',json,function(err,result){
			if(err){
					if(err == 'Permission Denied'){dialogs.openErrorDialog(err);return;}
					console.log(err);return;}
			else{
				alert('Permission Updated');
				
			}
	    })
	}





}]);