app.controller('rolesCtrl', ['$scope','servercalls','dialogs','$state','$rootScope','utils', function($scope, servercalls,dialogs,$state,$rootScope,utils){
	$rootScope.pagetitle = "Roles";
	$rootScope.menuname = "roles";
	$rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.roles'>Roles</a></li>"; 

	$scope.roles = {};
	$scope.addrole = false;

	//get all roles that exist
	servercalls.get('/api/roles/all', {}, function(err, result){
		if(err){$scope.error = err; return;
		}else{
			$scope.rolesGrid.data = result;
		}
	})

	// grid for roles
	$scope.rolesGrid= {
		columnDefs : [
		{displayName : "Roles" , field : "name"},
		{displayName : "Machine Name" , field : "machine_name" ,enableCellEdit : false},
		{displayName : "Operations" , field : "operations",enableCellEdit: false,cellTemplate: '<button ng-if="row.entity.locked == false" ng-click="grid.appScope.deleterole(row.entity,rowRenderIndex)" class="btn btn-xs btn-primary table_btns ng-scope">Delete</button>',enableSorting: false },
		]
	}

	//update call on edit of grid
	$scope.rolesGrid.onRegisterApi = function(gridApi) {
	    //set gridApi on scope
	    $scope.gridApi = gridApi;
	    gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
	       console.log('rowEntity',rowEntity);
	        if (newValue !== oldValue) {
	            servercalls.put('/api/roles/' + rowEntity.machine_name, rowEntity, function(err, result) {
	                if (err) {
  						if(err == 'Permission Denied'){dialogs.openErrorDialog(err);return;}
	                    console.log(err);
	                }
	            });
	        }
	    });
	}

	$scope.toggle = function(){
		$scope.addrole = !$scope.addrole;
		$scope.error = '';
		
	}

	//add new role
	$scope.add = function(){
		if($scope.roles.name != undefined && $scope.roles.name != ''){
			var machine_name =  utils.create_machine_name($scope.roles.name);
			servercalls.post('/api/roles/'+machine_name , {name: $scope.roles.name}, function(err, result){
				if(err){
					if(err == 'Permission Denied'){dialogs.openErrorDialog(err);return;}
					$scope.error = err;return;
				}else{
					$scope.rolesGrid.data.push(result);
					$scope.addrole = !$scope.addrole;
					$scope.roles.name = '';
				}
			})
		}else{
			$scope.error = "Please type role name";
		}
	}
	//delete role
	$scope.deleterole = function(row, index) {
		dialogs.openConfirmDialog('Delete Role<b> '+row.name+'</b>','', function(yes,no){
	      if(no){
	        console.log("dialogs CustomDialog");
	        return;
	      }else{
	      	servercalls.delete('/api/roles/' + row.machine_name,  function(err, result) {
	            if (err) {
					if(err == 'Permission Denied'){dialogs.openErrorDialog(err);return;}
	                $scope.error = err.message;
	                return;
	            } else {
	                $scope.rolesGrid.data.splice(index, 1);
	            }
	        });
	      }
	    })	
	}
}]);