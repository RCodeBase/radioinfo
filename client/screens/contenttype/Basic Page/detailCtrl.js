app.controller('am_fm_pageCtrl', ['$scope','$state','servercalls','$sce', function($scope,$state,servercalls,$sce){
	$scope.content = {};
			
	servercalls.get('/api/content/'+$state.params.title, {}, function(err, data){
		if(err){
			console.log("err",err);
		}else{
			//console.log("data in AM page detail",$scope.content);
			$scope.content.title = data.title;
			$scope.content.body = $sce.trustAsHtml(data.fields.body.data);
		}		
	})	
}])