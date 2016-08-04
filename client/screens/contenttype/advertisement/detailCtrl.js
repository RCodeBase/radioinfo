app.controller('detailCtrl', ['$scope','$state','servercalls','$sce', function($scope,$state,servercalls,$sce){
	$scope.content = {};
	servercalls.get('/api/content/'+$state.params.title, {}, function(err, data){
		if(err){
			console.log("err",err);
		}else{
			console.log("advertisement data",data)
			$scope.content.title = data.title;			
			$scope.content.image = data.fields.banner_image.url;
			$scope.content.position = data.fields.banner_position;			
			$scope.content.link = data.fields.link;			
		}		
	})
}])