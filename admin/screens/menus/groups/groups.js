app.controller('groupsCtrl', ['$scope','servercalls','dialogs','$state','$rootScope','utils', function($scope, servercalls,dialogs,$state,$rootScope, utils){
	$rootScope.pagetitle = "Menus Groups";
	$rootScope.menuname = "menus";
	$rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.groups'>Menus</a></li>";

	//column details
	$scope.groupsGrid = {
		columnDefs : [
		{displayName : "Group name", field : "group_name"},
		{displayName : "Machine Name", field : "machine_name", enableCellEdit: false},
		{displayName : "Operations" , field : "operations",enableCellEdit: false , cellTemplate: '<button ng-click="grid.appScope.showmenus(row.entity)" class="btn btn-xs btn-primary table_btns">Show Menus</button><button class="btn btn-xs btn-primary table_btns" ng-click="grid.appScope.deletegroup(row.entity,rowRenderIndex)">Delete</button>',enableSorting: false },
		]
	}

	//get all roles that exist
	servercalls.get('/api/menus/all', {}, function(err, result){
		if(err){$scope.error = err; return;
		}else{
			$scope.groupsGrid.data = result;
		}
	})
	//show add form
	$scope.toggle = function(){
		$scope.addgroup = !$scope.addgroup;
		$scope.error = '';
	}

	$scope.showmenus =function(row){
		$state.go("dashboard.groups_menus",{'machine_name' : row.machine_name});
	}

	//on edit of row
	$scope.groupsGrid.onRegisterApi = function(gridApi) {
	    $scope.gridApi = gridApi;
	    gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
	        if (newValue !== oldValue) {
	            servercalls.put('/api/menus/group/' + rowEntity.machine_name+"/"+rowEntity.group_name, {}, function(err, result) {
	                if (err) {
	                	if(err == 'Permission Denied'){
		 					dialogs.openErrorDialog(err);return
		 				}
	                    console.log(err);
	                }
	            });
	        }
	    });
	};


	$scope.add = function(){		
		if($scope.group.label != undefined && $scope.group.label != ''){
			var string = utils.create_machine_name($scope.group.label);
			servercalls.post('/api/menus/group/'+string+"/"+$scope.group.label,{},function(err, doc){
				if(err){
	                if(err == 'Permission Denied'){
	 					dialogs.openErrorDialog(err);return
	 				}
					console.log("err",err);return;
				}else{
					$scope.groupsGrid.data.push(doc);
					$scope.addgroup = !$scope.addgroup;
					$scope.group.label = '';
				}
			})
		}else{
			$scope.error = "Please type Group name";
		}
	}

	$scope.deletegroup =  function(row, index){
	  dialogs.openConfirmDialog('Delete Menu<b> '+row.group_name+'</b>','', function(yes,no){
      if(no){
        console.log("dialogs CustomDialog");
        return;
      }else{
      	servercalls.delete('/api/menus/group/'+row.machine_name, function(err,doc){
		 	if(err){
                if(err == 'Permission Denied'){
 					dialogs.openErrorDialog(err);return
 				}
		 		console.log(err);return;}
		 	else{
		 		$scope.groupsGrid.data.splice(index,1);
		 	}			 	
		 })
	      }
	    })		
	};


}]);