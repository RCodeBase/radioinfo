app.controller('ContentTypesCtrl',['$scope','servercalls','$state','dialogs','$rootScope','utils', function($scope,servercalls,$state,dialogs,$rootScope,utils){
  $rootScope.pagetitle = "Contenttypes";
  $rootScope.menuname = "contenttypes";
  $rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.contenttypes'>Content Type</a></li>";

	$scope.contenttypeGrid= {};
	$scope.contenttypeGrid.columnDefs = [
		{displayName : "Name" , field : "label"},
		{displayName : "Machine Name" , field : "machine_name", enableCellEdit: false},
		{displayName : "Operations" , field : "operations",enableCellEdit: false , cellTemplate: '<button class="btn btn-xs btn-primary table_btns" ng-click="grid.appScope.editcontenttype(row.entity,rowRenderIndex)">Edit</button> <button ng-click="grid.appScope.MangaeFields(row.entity)" class="btn btn-xs btn-primary table_btns">Manage Fields</button><button class="btn btn-xs btn-primary table_btns" ng-click="grid.appScope.deletecontenttype(row.entity,rowRenderIndex)">Delete</button>',enableSorting: false },
	];

	//set for default 
	$scope.contenttype ={};
	$scope.contenttype.publish =true;
	$scope.contenttype.comments = true;
 	$scope.temp_form = '<form ng-submit="confirm()"> <div class="form-group"> <label>Enter Content Type </label> <input class="form-control" ng-model="contenttype.label"> </div> <div class="form-group"> <div class="checkbox"> <label > <input type="checkbox" ng-model="contenttype.comments">Comment</label> </div> </div> <div class="form-group"> <div class="checkbox"> <label> <input type="checkbox" ng-model="contenttype.publish">Publish </label> </div> </div> <button type="submit" class="table_btns btn btn-sm btn-default">Create Content Type</button> <button ng-click="closeThisDialog(0)" class="btn btn-sm btn-default table_btns">Cancel</button> </form>';

	//on editing of row
    $scope.contenttypeGrid.onRegisterApi = function(gridApi) {
	    //set gridApi on scope
	    $scope.gridApi = gridApi;
	    gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
	        if (newValue !== oldValue) {
	            servercalls.put('/api/contenttype/' + rowEntity.machine_name, rowEntity, function(err, result) {
	                if (err) {
						dialogs.openErrorDialog(err);
	                }
	            });
	        }
	    });
	};

 
	//get all contents 
	servercalls.get('/api/contenttype/all',{},function(err,result){
			if(err){dialogs.openErrorDialog(err);return;}
			else{$scope.contenttypeGrid.data = result;	}
	})


	$scope.createtypeform = function(){
		dialogs.CustomDialog('Create Content Type',$scope.temp_form,$scope, function(yes,no){
		  	if(yes){
		  		var string = utils.create_machine_name($scope.contenttype.label);
		  		servercalls.post('/api/contenttype/'+string , $scope.contenttype,function(err,result){
					if(err){dialogs.openErrorDialog(err);return;}
					else{
						$scope.contenttypeGrid.data.push(result);

						//reset setting to default
						$scope.contenttype ={};
						$scope.contenttype.publish =true;
						$scope.contenttype.comments = true;
					}
				})
		  	}
		});
	}

	$scope.editcontenttype = function(row,index){
		var orignal_content_type  = angular.copy(row);
		$scope.contenttype = row;
		dialogs.CustomDialog('Edit Content Type', $scope.temp_form.replace('Create Content Type','Update Content Type'),$scope, function(yes,no){
		  	if(yes){
		  		 servercalls.put('/api/contenttype/' + row.machine_name, $scope.contenttype, function(err, result) {
	                if (err) {dialogs.openErrorDialog(err);return;}
	                else{
	                	$scope.contenttypeGrid.data[index] = $scope.contenttype;
	                }
	            });
		  	}else{
		  		$scope.contenttypeGrid.data[index] = orignal_content_type;
		  	}
		});
	}

	//manage fields
	$scope.MangaeFields = function(row){
		$state.go('dashboard.contenttypes_fields',{ct_machine_name : row.machine_name});
	}
	//delete content type
	$scope.deletecontenttype = function(row,index){
		dialogs.openConfirmDialog('Are you sure to delete <b>'+row.label+'</b>','',function(yes,no){
			if(yes){
				servercalls.delete('/api/contenttype/'+row.machine_name ,function(err,result){
					if(err){
						dialogs.openErrorDialog(err);
					}else{
						$scope.contenttypeGrid.data.splice(index,1);
					}
				});
			}
		});
	}

}]);

