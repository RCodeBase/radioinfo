app.controller('onthisdaydetailCtrl', ['$scope','$state','servercalls', function($scope,$state,servercalls){
	$scope.content = {};
	servercalls.get('/api/content/'+$state.params.title, {}, function(err, data){
		if(err){
			console.log("err",err);
		}else{
			console.log("data in news detail",data);
			$scope.content.title = data.title;
			$scope.content.body = data.fields.text.data;
		}
		
	})
}])