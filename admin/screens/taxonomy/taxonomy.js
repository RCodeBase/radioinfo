app.controller('taxonomyCtrl', ['$scope','servercalls','dialogs','$state','$rootScope','utils', function($scope, servercalls,dialogs,$state,$rootScope,utils){
	$rootScope.pagetitle = "Taxonomy";
	$rootScope.menuname = "taxonomy";
	$rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.taxonomy'>Taxonomy</a></li>";

	//column details
	$scope.taxonomyGrid = {
		columnDefs : [
		{displayName : "Taxonomy term", field : "label"},
		{displayName : "Machine Name", field : "machine_name", enableCellEdit: false},
		{displayName : "Operations" , field : "operations",enableCellEdit: false , cellTemplate: '<button ng-click="grid.appScope.addTerm(row.entity)" class="btn btn-xs btn-primary table_btns">List Terms</button><button class="btn btn-xs btn-primary table_btns" ng-click="grid.appScope.deleteVocabulary(row.entity,rowRenderIndex)">Delete</button>',enableSorting: false },
		]
	}
	$scope.taxonomyGrid.data = [];
	// all taxonomy get
	servercalls.get('/api/taxonomy/all', {}, function(err, result){
		if(err){$scope.error = err;console.log(err);return;}
		else{
			$scope.taxonomyGrid.data = result;
		}
	})

	//on edit of row
	$scope.taxonomyGrid.onRegisterApi = function(gridApi) {
	    $scope.gridApi = gridApi;
	    gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
	        if (newValue !== oldValue) {
	            servercalls.put('/api/taxonomy/' + rowEntity.machine_name, rowEntity, function(err, result) {
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

	//show add form
	$scope.toggle = function(){
		$scope.addterm = !$scope.addterm;
		$scope.error = '';
	}
	$scope.add = function(){		
		if($scope.vocabulary.label != undefined && $scope.vocabulary.label != ''){
			var string = utils.create_machine_name($scope.vocabulary.label);
			servercalls.post('/api/taxonomy/'+string, $scope.vocabulary, function(err, doc){
				if(err){
	 				if(err == 'Permission Denied'){
	 					dialogs.openErrorDialog(err);return
	 				}
					console.log("err",err);return;
				}else{
					$scope.taxonomyGrid.data.push(doc);
					$scope.addterm = !$scope.addterm;
					$scope.vocabulary.label = '';
				}
			})
		}else{
			$scope.error = "Please type Taxonomy name";
		}
	}

	$scope.deleteVocabulary =  function(row, index){
		dialogs.openConfirmDialog('Delete Taxonomy :<b> '+row.label+'</b>','', function(yes,no){
	      if(no){
	        console.log("dialogs Delete Taxonomy");
	        return;
	      }else{
	      	servercalls.delete('/api/taxonomy/'+row.machine_name,  function(err,doc){
			 	if(err){
	 				if(err == 'Permission Denied'){
	 					dialogs.openErrorDialog(err);return
	 				}

			 		console.log(err);return;}
			 	else{
			 		$scope.taxonomyGrid.data.splice(index,1);
			 	}			 	
			})
	      }
	    })		
	}

	$scope.addTerm = function(row){
		$state.go('dashboard.taxonomy_term',{taxonomy_m_name : row.machine_name});
	}



}]);