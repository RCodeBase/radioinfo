app.controller('airplayCtrl', ['$scope','servercalls','$sce', function($scope,servercalls,$sce){
	$scope.airplay = '';
	servercalls.get('/api/airplay', {}, function(err, data){
		if(err){
			console.log("err",err);
		}else{
			//console.log("sucess",data);
			$scope.airplay = $sce.trustAsHtml(data);
		}
		
	})
}])