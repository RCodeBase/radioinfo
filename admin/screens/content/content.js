app.controller('contentCtrl',['$scope','servercalls','$state','dialogs','$rootScope','$storage', function($scope,servercalls,$state,dialogs,$rootScope,$storage){
  $rootScope.pagetitle = "Contents";
  $rootScope.menuname = "content";
  $rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.content'>Contents</a></li>";
  
  var storage = $storage('radioinfo');

	//default config for pagination work
	$scope.count = 0;
	$scope.currentpage =1 ;
	$scope.limit =10;

	//get fields for showing
	$scope.config = {
		'skip' : 0,
		'limit' : $scope.limit,
		 'sort': {created_on : -1}
 	};

	if(storage.getItem('contents')){
		$scope.config.filter = {contenttype_machine_name : storage.getItem('contents').machine_name};
		$scope.type = storage.getItem('contents');
	}
	
	//column details
	$scope.contentGrid = {
		columnDefs : [
		{displayName : "Title", field : "title"},
		{displayName : "type", field : "contenttype.label"},
		{displayName : "Author", field : "creator.local.username"},
		{displayName : "Operations" , field : "operations", cellTemplate: '<button ng-click="grid.appScope.editcontent(row.entity)" class="btn btn-xs btn-primary table_btns">Edit</button><button class="btn btn-xs btn-primary table_btns" ng-click="grid.appScope.deletecontent(row.entity,rowRenderIndex)">Delete</button>',enableSorting: false },
		]
	}


	//get total pages count
	 function getTotalPages(){
		return $scope.getTotalPages = Math.ceil($scope.count / $scope.config.limit);
	}

	//next page work
	$scope.nextPage = function(){
		if($scope.currentpage < $scope.getTotalPages){
			$scope.currentpage++;
			$scope.config.skip = $scope.config.skip + $scope.limit;
			get_contents();	
		}
	}
	
	//previous page work
	$scope.previousPage = function(){
		if($scope.currentpage > 1 ){
			$scope.currentpage--;
			$scope.config.skip = $scope.config.skip - $scope.limit;
			get_contents();	
		}
	}

	//for first time contents
	get_contents();
	getcount();

	function get_contents(){
		servercalls.get('/api/content/all',$scope.config,function(err,result){
			if(err){$scope.error = err; console.log(err); return;}
			else{
				$scope.contentGrid.data = result;
				getcount();
			}
		})
	}

	function getcount(){
		servercalls.get('/api/content/all/count',$scope.config,function(err,result){
			if(err){console.log(err);return;}
			else{
				$scope.count = result;
				getTotalPages();
			}
		})
	}

	//edit and delete contents
	$scope.editcontent = function(row){
		$state.go("dashboard.editcontent",{machine_name : row.machine_name});
	}
	$scope.deletecontent = function(row,index){
	  dialogs.openConfirmDialog('Delete Menu<b> '+row.title+'</b>','', function(yes,no){
   	   if(yes){
         	servercalls.delete('/api/content/'+row.machine_name, function(err, result){
			 	if(err){
	 				if(err == 'Permission Denied'){
	 					dialogs.openErrorDialog(err);return
	 				}
			 		console.log(err);return;}
				else{
					$scope.contentGrid.data.splice(index,1);
				}
			})
    	  }
    	});
	 }

	 //filteration work
	//get all content types
	servercalls.get('/api/contenttype/all',{},function(err,result){
		if(err){dialogs.openErrorDialog(JSON.stringify(err));
		}else{
			$scope.content_types = result;		
		}
	})
	$scope.searchcontent = function(){
		if($scope.type.machine_name){
			storage.setItem('contents', $scope.type);
			$scope.config.filter = {contenttype_machine_name : $scope.type.machine_name};
			get_contents();
		}
	}
	$scope.filterDisable = function(){
		delete $scope.config.filter ;
		storage.removeItem('contents');
		$scope.type = "";
		get_contents();
	} 
}]);