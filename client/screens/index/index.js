app.controller('indexCtrl', ['$scope','$rootScope','servercalls','$storage','$state','$location', function($scope,$rootScope,servercalls,$storage,$state,$location){
	//console.log("location",$location);
	$scope.menus = {};
	$scope.footer_menus = {};
	$scope.ads_R1 = {};
	$scope.ads_R1a = {};
	$scope.ads_R2 = {};
	$scope.ads_R3 = {};
	$scope.ticker_image = {};
	$scope.ads_top = {};
	$scope.skyadd_left = {};
	$scope.skyadd_right = {};
	$rootScope.client_base_path = 'http://lr.com/';
	var storage = $storage('radioinfo');
	
	//$rootScope.base_path = 'http://localhost:3000'; 
	$rootScope.base_path = 'https://server.lr.com'; 



    // $scope.$watch('myVar', function() {
    //     alert('hey, myVar has changed!');
    // });

    
	$rootScope.$on('SucessMessage', function(event,data) {
        $scope.sucess = data.sm; 
    })
    // Check is user login or not?
	servercalls.get('/api/users/islogin',{},function(err,result){
		if(err){
			storage.removeItem('user')
		}else{
			storage.setItem('user', result);
			$rootScope.loggedInUser = result;				
		}
	})
	// Get Main menu
	var menu_config = {
		filter : {machine_name : 'main_menu'},
	}
	servercalls.get('/api/menus/all', menu_config ,function(err,result){
		if(err){
			console.log("err",err);
		}else{	
			//console.log('rrrrr',result);
			$scope.menus = result[0].menus;
		

		}
	})

	// Get Footer menu
	var menu_config = {
		filter : {machine_name : 'footer_menu'}
	}
	servercalls.get('/api/menus/all', menu_config ,function(err,result){
		if(err){
			console.log("err",err);
		}else{	
			//console.log('gggg',result);
			$scope.footer_menus = result[0].menus;

		}
	})

	// Advertisement section for Right 1
	var ads_config_r1 = {
		filter : {
			'contenttype_machine_name' : 'advertisement',
			'fields.banner_position' : 'right 1'
		},
		sort : { created_on : -1 },
		limit : "1"
	}
	servercalls.get('/api/content/all', ads_config_r1, function(err, result){
		if(err){
			console.log("err",err);
		}else{
			//console.log("ads section right 1",result);
			$scope.ads_R1 = result[0];
			$scope.ads_R1.image = result[0].fields.banner_image.url;
			$scope.ads_R1.link = result[0].fields.link;
		}
	});

	// Advertisement section for Right 1a
	var ads_config_r1a = {
		filter : {
			'contenttype_machine_name' : 'advertisement',
			'fields.banner_position' : 'right 1a'
		},
		sort : { created_on : -1 },
		limit : "2"
	}
	servercalls.get('/api/content/all', ads_config_r1a, function(err, result){
		if(err){
			console.log("err",err);
		}else{
			//console.log("ads section right 1a",result);
			$scope.ads_R1a = result;
			// $scope.ads_R1a.image = result[0].fields.banner_image.url;
			// $scope.ads_R1a.link = result[0].fields.link;
		}
	});

	// Advertisement section for Right 2
	var ads_config_r2 = {
		filter : {
			'contenttype_machine_name' : 'advertisement',
			'fields.banner_position' : 'right 2'
		},
		sort : { created_on : -1 },
		limit : "1"
	}
	servercalls.get('/api/content/all', ads_config_r2, function(err, result){
		if(err){
			console.log("err",err);
		}else{
			$scope.ads_R2 = result[0];
			$scope.ads_R2.image = result[0].fields.banner_image.url;
			$scope.ads_R2.link = result[0].fields.link;
			//console.log("ads section right 2",result);
		}
	});
	// Advertisement section for Right 3
	var ads_config_r3 = {
		filter : {
			'contenttype_machine_name' : 'advertisement',
			'fields.banner_position' : 'right 3'
		},
		sort : { created_on : -1 },
		limit : "1"
	}
	servercalls.get('/api/content/all', ads_config_r3, function(err, result){
		if(err){
			console.log("err",err);
		}else{
			//console.log("ads section right 3",result);
			$scope.ads_R3 = result[0];
			$scope.ads_R3.image = result[0].fields.banner_image.url;
			$scope.ads_R3.link = result[0].fields.link;		
		}
	});

	// Advertisement section for Top banner section	
	var ads_config_top = {
		filter : {
			'contenttype_machine_name' : 'advertisement',
			'fields.banner_position' : 'top'
		},
		sort : { created_on : -1 },
		limit : "1"
	}
	servercalls.get('/api/content/all', ads_config_top, function(err, result){
		if(err){
			console.log("err",err);
		}else{
			$scope.ads_top = result[0];
			$scope.ads_top.image = result[0].fields.banner_image.url;
			$scope.ads_top.link = result[0].fields.link;
			//console.log("ads section ads_top",result);
		}
	});

	// Skyadd left
	var skyadd_config = {
		filter : {
			'contenttype_machine_name' : 'advertisement',
			'fields.banner_position' : 'skyadd left'
		},
		sort : { created_on : -1 },
		limit : "1"
	}
	servercalls.get('/api/content/all', skyadd_config, function(err, result){
		if(err){
			console.log("err",err);
		}else{
			//console.log("ads section skyadd",result);
			$scope.skyadd_left = result[0];
			$scope.skyadd_left.image = result[0].fields.banner_image.url;
			$scope.skyadd_left.link = result[0].fields.link;			
		}
	});
	// Skyadd right
	var skyadd_rg_config = {
		filter : {
			'contenttype_machine_name' : 'advertisement',
			'fields.banner_position' : 'skyadd right'
		},
		sort : { created_on : -1 },
		limit : "1"
	}
	servercalls.get('/api/content/all', skyadd_rg_config, function(err, result){
		if(err){
			console.log("err",err);
		}else{
			//console.log("ads section skyadd",result);
			$scope.skyadd_right = result[0];
			$scope.skyadd_right.image = result[0].fields.banner_image.url;
			$scope.skyadd_right.link = result[0].fields.link;			
		}
	});

	// Job ticker
	$scope.job_list_config = {
		filter : {
			'contenttype_machine_name' : 'new_job_vacancy',
			'publish' : 'true'
		},
		'skip' : 0,
	 	'limit' : 5,
	}
	
	servercalls.get('/api/content/jobs',$scope.job_list_config,function(err,result){
		if(err){
			console.log("err",err);
		}else{
			$scope.jobList = result;
			//console.log("job_list_config",result[0]);
		}
	});
	// Advertisement section for job ticker
	var config_jobs_banner = {
		filter : {
			'contenttype_machine_name' : 'advertisement',
			'fields.banner_position' : 'jobs banner'
		},
		sort : { created_on : -1 },
		limit : "1"
	}
	servercalls.get('/api/content/all', config_jobs_banner, function(err, result){
		if(err){
			console.log("err",err);
		}else{
			$scope.ticker_image = result[0];
			$scope.ticker_image.image = result[0].fields.banner_image.url;
			$scope.ticker_image.link = result[0].fields.link;
			// console.log("ads section job ticker",result);
		}
	});
	$scope.logout = function(){
		servercalls.get('/api/users/logout',{},function(err,result){
			if(err){console.log(err);return;}
			else{
				$rootScope.loggedInUser = null;		
				storage.removeItem('user');
				$state.go('index.login');
			}
		})	
	}
}]);