app.controller('homeCtrl', ['$scope','$state','servercalls','$sce', function($scope,$state,servercalls,$sce){
	$scope.news = {};
	$scope.list = {};
	$scope.hotNews = {};
	$scope.ads_left4and5 = {};
	$scope.ads_left6and7and8 = {};
	$scope.listType = 'news';

	// showing home slider based on sorting

	var slider_config = {
		limit : 3
	}

	servercalls.get('/api/node_weight/home_slider', slider_config, function(err, result){
		if(err){
			console.log("err",err);
		}else{
			$scope.news = result.content;
			//console.log("slider news",result.content);
		}
	});

	// showing home list based on sorting

	var newslist_config = {
		limit : 4
	}

	servercalls.get('/api/node_weight/home_list', newslist_config, function(err, result){
		if(err){
			console.log("err",err);
		}else{
			$scope.list = result.content;
			console.log("more news",result.content);
		}
	});

	// showing Hot of the Net data based on sorting

	var hotnewslist_config = {
		limit : 4
	}

	servercalls.get('/api/node_weight/hot_news', hotnewslist_config, function(err, result){
		if(err){
			console.log("err",err);
		}else{
			$scope.hotNews = result.content;
			//console.log("hot of the net",result.content);
		}
	});

	// Advertisement section for left 4 & 5
	var ads_config_left4and5 = {
		filter : {
			'contenttype_machine_name' : 'advertisement',
			'fields.banner_position' : 'left 4 & 5'
		},
		sort : { created_on : -1 },
		limit : "2"
	}
	servercalls.get('/api/content/all', ads_config_left4and5, function(err, result){
		if(err){
			console.log("err",err);
		}else{
			console.log("ads section ads_left4and5",result);
			$scope.ads_left4and5 = result;
			// $scope.ads_left4and5.image = result[0].fields.banner_image.filefullurl;
			// $scope.ads_left4and5.link = result[0].fields.link;
			
		}
	});

	// Advertisement section for left 6 and 7 and 8
	var ads_config_left6and7and8 = {
		filter : {
			'contenttype_machine_name' : 'advertisement',
			'fields.banner_position' : 'left 6, 7 & 8'
		},
		sort : { created_on : -1 },
		limit : "3"
	}
	servercalls.get('/api/content/all', ads_config_left6and7and8, function(err, result){
		if(err){
			console.log("err",err);
		}else{
			console.log("ads section ads_config_left6and7and8",result);
			$scope.ads_left6and7and8 = result;
			// $scope.ads_left4and5.image = result[0].fields.banner_image.filefullurl;
			// $scope.ads_left4and5.link = result[0].fields.link;			
		}
	});
	
}]);


