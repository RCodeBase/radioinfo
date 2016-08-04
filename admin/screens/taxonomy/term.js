app.controller('termCtrl', ['$scope','servercalls','dialogs','$state','$rootScope','utils', function($scope, servercalls,dialogs,$state,$rootScope,utils){

	$rootScope.menuname = "taxonomy";
	$rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.taxonomy'>Taxonomy</a></li>";

	//grid for term
	$scope.termGrid = {
		columnDefs : [
		{displayName : "Term name", field : "label"},
		{displayName : "Machine Name", field : "machine_name", enableCellEdit: false},
		{displayName : "Operations" , field : "operations",enableCellEdit: false , cellTemplate: '<button ng-click="grid.appScope.deleteTerm(row.entity)" class="btn btn-xs btn-primary table_btns">Delete</button>',enableSorting: false },
		]
	}

	//get terms for current taxonomy
	servercalls.get('/api/taxonomy/'+$state.params.taxonomy_m_name, {}, function(err, result){
		if(err){dialogs.openErrorDialog("No taxonomy found");return;
		}else{
			$rootScope.pagetitle = result.label;
			$scope.termGrid.data = result.terms;
		}
	})

	//toggle form show
	$scope.toggle = function(){
		$scope.addtaxonomyterm = !$scope.addtaxonomyterm;
	}
	//on edit of row
	$scope.termGrid.onRegisterApi = function(gridApi) {
	    $scope.gridApi = gridApi;
	    gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
	        if (newValue !== oldValue) {

	            servercalls.put('/api/taxonomy/' + $state.params.taxonomy_m_name + '/term/' + rowEntity.machine_name, rowEntity, function(err, result) {
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


	$scope.add = function() {
	    if ($scope.terms.label != undefined && $scope.terms.label != '') {
	        var string = utils.create_machine_name($scope.terms.label);

	        if (_.where($scope.termGrid.data, { "machine_name": string }).length > 0) {
	            dialogs.openErrorDialog('Term Exist');
	            return;
	        } else {
	            servercalls.post('/api/taxonomy/' + $state.params.taxonomy_m_name + '/term/' + string, $scope.terms, function(err, result) {
	                if (err) {
	                    if (err == 'Permission Denied') {
	                        dialogs.openErrorDialog(err);
	                        return
	                    }
	                    console.log("err", err);
	                    return;
	                } else {
	                    console.log(result);
	                    $scope.termGrid.data = result.terms;
	                    $scope.addtaxonomyterm = !$scope.addtaxonomyterm;
	                    $scope.terms.label = '';
	                }
	            })

	        }

	    } else {
	        $scope.error = "Please type Term name";
	    }
	}


	$scope.deleteTerm =  function(row, index){
		dialogs.openConfirmDialog('Delete Term :<b> '+row.label+'</b>','', function(yes,no){
	      if(no){
	        console.log("dialogs Delete Term");
	        return;
	      }else{
	      	servercalls.delete('/api/taxonomy/'+$state.params.taxonomy_m_name+'/term/'+row.machine_name, {}, function(err,result){
			 	if(err){
	 				if(err == 'Permission Denied'){
	 					dialogs.openErrorDialog(err);return
	 				}
			 		console.log(err);return;}
			 	else{
			 		$scope.termGrid.data.splice(index,1);
			 	}			 	
			 })
	      }
	    })		
	};
	
}]);