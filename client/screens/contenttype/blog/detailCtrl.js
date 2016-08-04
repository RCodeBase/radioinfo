app.controller('blogdetailCtrl', ['$scope','$state','servercalls','$sce', function($scope,$state,servercalls,$sce){
	$scope.content = {};
	servercalls.get('/api/content/'+$state.params.title, {}, function(err, data){
		if(err){
			console.log("err",err);
		}else{
			console.log("data in news detail",data);
			$scope.content.title = data.title;
			$scope.content.body = $sce.trustAsHtml(data.fields.description.data);
		}		
	})	
	var myVar = setInterval(function(){ 
		
		if($('div[ng-bind-html="content.body"] img').attr('src').indexOf('https://www.radioinfo.com.au') == -1){
			clearInterval(myVar);
			$('div[ng-bind-html="content.body"] img').attr('src' ,"https://www.radioinfo.com.au"+$('div[ng-bind-html="content.body"] img').attr('src') );
		}
	}, 10);
}])