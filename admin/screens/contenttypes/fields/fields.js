app.controller('ContentTypesFieldsCtrl', ['$scope','servercalls','$state','dialogs','$rootScope', function($scope,servercalls,$state,dialogs,$rootScope){

  $rootScope.menuname = "contenttypes";
  $rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.contenttypes'>Content Type</a></li>";

	$scope.contenttypefieldsGrid= {};
	$scope.contenttypefieldsGrid.columnDefs = [
		{displayName : "Name" , field : "label"},
		{displayName : "Machine Name" , field : "machine_name"},
		{displayName : "Type" , field : "type.label"},
		{displayName : "Operations" , field : "operations", cellTemplate: '<button ng-click="grid.appScope.editfield(row.entity)" class="btn btn-xs btn-primary table_btns">Edit</button><button class="btn btn-xs btn-primary table_btns" ng-click="grid.appScope.deletefield(row.entity,rowRenderIndex)">Delete</button>',enableSorting: false },
	];
	servercalls.get('/api/contenttype/'+$state.params.ct_machine_name,{},function(err,result){
		//for setting name in page title
		$rootScope.pagetitle =result.label;
		$scope.contenttypefieldsGrid.data = result.fields;
	})
	$scope.movecreatefield =function(){
		$state.go('dashboard.fields_create',{ct_machine_name : $state.params.ct_machine_name});
	}

	$scope.editfield = function(row){
		$state.go('dashboard.fields_edit',{ct_machine_name : $state.params.ct_machine_name , machine_name : row.machine_name});
	}
	//delete content type
	$scope.deletefield = function(row,index){
		dialogs.openConfirmDialog('Are you sure to delete <b>'+row.label+'</b>','',function(yes,no){
			if(yes){
				servercalls.delete('/api/contenttype/'+$state.params.ct_machine_name+"/field/" +row.machine_name ,function(err,result){
					if(err){	
						dialogs.openErrorDialog(err);
						console.log(err);
					}else{
						$scope.contenttypefieldsGrid.data.splice(index,1);
					}
				});
			}
		});
	}

}])