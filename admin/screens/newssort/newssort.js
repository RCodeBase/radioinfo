app.controller('newsSortCtrl', ['$scope','$state','$rootScope','$storage','servercalls','dialogs', function($scope,$state,$rootScope,$storage,servercalls,dialogs){
  $rootScope.pagetitle = "News Sorting Page";
  $rootScope.menuname = "dashboard";
  $rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.newssort'>News Sort</a></li>";


  //config settings	
  $scope.config = {};
  $scope.config.limit = 5;
  $scope.config.fields = {title : 1};
  //home_slider , home_list
  
  $scope.select_type = 'home_slider';

	//column details
	$scope.newsGrid = {
		columnDefs : [{displayName : "Title", field : "title",enableSorting: false}],
	    rowTemplate: '<div grid="grid" class="ui-grid-draggable-row" draggable="true"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader, \'custom\': true }" ui-grid-cell></div></div>'
	}

	$scope.typechange = function(){
		if($scope.select_type == 'hot_news'){
			$scope.config.filter = {"fields.show_on_homepage" : 'true',contenttype_machine_name :'hot_news'};
			$scope.get_contents();
		}else{
			$scope.config.filter = {"fields.display_in" : $scope.select_type ,contenttype_machine_name :'news' }
			$scope.get_contents();
		}
	}

	$scope.get_contents = function(){
		servercalls.get('/api/content/all', $scope.config,function(err,result){
			if(err){dialogs.openErrorDialog(JSON.stringify(err)); return;}
			else{
				$scope.newsGrid.data = result;
			}
		})
	}	
	$scope.savesorting = function(){
		var saving_array = [];
		$scope.newsGrid.data.forEach(function(data){
			saving_array.push(data._id);
		})

		servercalls.put('/api/node_weight/'+$scope.select_type,saving_array,function(err,result){
			if(err){dialogs.openErrorDialog(JSON.stringify(err)); return;}
			else{
				dialogs.openMessageDialog('News Sorting Updated');
			}
		});
	}
	//call for first time load 
	$scope.typechange();


}]);