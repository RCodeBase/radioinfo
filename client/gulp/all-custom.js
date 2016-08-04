
var app = angular.module('ClientRadioinfo',['ui.router','ngDialog','ngSanitize','localStorageModule','ngCkeditor','vcRecaptcha','angular-flexslider','simpleAngularTicker']);


app.config(function($stateProvider,$urlRouterProvider,$locationProvider){
	$urlRouterProvider.otherwise('/');

	// use the HTML5 History API
    $locationProvider.html5Mode(true);

	$stateProvider

	.state('index', {
		url : '',
		templateUrl : "/screens/index/index.html",
		controller : "indexCtrl"
	})

	.state('index.home', {
		url : '/',
		templateUrl : "/screens/home/home.html",
		controller : "homeCtrl"
	})

	.state('index.login', {
		url : '/login',
		templateUrl : "/screens/login/login.html",
		controller : "loginCtrl"
	})
	.state('index.register', {
		url : '/register',
		templateUrl : "/screens/register/register.html",
		controller : "registerCtrl"
	})
	.state('index.verify', {
		url : '/user/verify/:token/:email',
		templateUrl : "/screens/login/login.html",
		controller : "loginCtrl"
	})
	.state('index.resetPassword',{
		url : "/user/reset/password/:token/:eid",
		templateUrl : "/screens/users/reset_password/reset.html",
		controller : "resetPasswordCtrl"
	})
	// .state('index.changePassword',{
	// 	url : "/change/password",
	// 	templateUrl : "/screens/users/change_password/change.html",
	// 	controller : "changePasswordCtrl"
	// })
	.state('index.profile',{
		url : "/user/profile",
		templateUrl : "/screens/users/profile/profile.html",
		controller : "profileCtrl"
	})

	// content type based url

	.state('index.newsDetail', {
		url : '/news/:title',
		templateUrl : "/screens/contenttype/news/detail.html",
		controller : "newsdetailCtrl"
	})

	.state('index.blogDetail', {
		url : '/blog/:title',
		templateUrl : "/screens/contenttype/blog/detail.html",
		controller : "blogdetailCtrl"
	})

	.state('index.newsList', {
		url : '/news',
		templateUrl : "/screens/contenttype/news/list.html",
		controller : "newslistCtrl"
	})
	.state('index.advertisementDetail', {
		url : '/advertisement/:title',
		templateUrl : "/screens/contenttype/advertisement/detail.html",
		controller : "detailCtrl"
	})

	.state('index.advertisementList', {
		url : '/advertisement',
		templateUrl : "/screens/contenttype/advertisement/list.html",
		controller : "advlistCtrl"
	})

	.state('index.commingsAndGoingsDetail', {
		url : '/people/movements/:title',
		templateUrl : "/screens/contenttype/commings and goings/detail.html",
		controller : "c_and_g_detailCtrl"
	})

	.state('index.commingsAndGoingsList', {
		url : '/people/movements',
		templateUrl : "/screens/contenttype/commings and goings/list.html",
		controller : "c_and_g_listCtrl"
	})

	.state('index.HotNewsDetail', {
		url : '/hot/news/:title',
		templateUrl : "/screens/contenttype/Hot News/detail.html",
		controller : "hotnewsdetailCtrl"
	})

	.state('index.HotNewsList', {
		url : '/news/hot',
		templateUrl : "/screens/contenttype/Hot News/list.html",
		controller : "hotnewslistCtrl"
	})

	.state('index.jobsDetail', {
		url : '/jobs/:title',
		templateUrl : "/screens/contenttype/New Job Vacancy/detail.html",
		controller : "jobsdetailCtrl"
	})

	.state('index.jobsList', {
		url : '/jobs',
		templateUrl : "/screens/contenttype/New Job Vacancy/list.html",
		controller : "jobslistCtrl"
	})

	.state('index.brainTrust', {
		url : '/brains-trust',
		templateUrl : "/screens/contenttype/brains-trust/list.html",
		controller : "brainTrustCtrl"
	})
	// Taxonomy URL for News

	.state('index.newsTaxonomy', {
		url : '/news/taxonomy/:tax',
		templateUrl : "/screens/taxonomy/news/taxonomy.html",
		controller : "taxonomyCtrl"
	})

	.state('index.newsTaxonomyAus', {
		url : '/news/aus',
		templateUrl : "/screens/taxonomy/news/taxonomy.html",
		controller : "austaxonomyCtrl"
	})
	.state('index.newsTaxonomyWorld', {
		url : '/news/world',
		templateUrl : "/screens/taxonomy/news/taxonomy.html",
		controller : "austaxonomyCtrl"
	})
	.state('index.newsTaxonomyTech', {
		url : '/news/tech',
		templateUrl : "/screens/taxonomy/news/taxonomy.html",
		controller : "austaxonomyCtrl"
	})

	// Taxonomy URL for Blog

	.state('index.blogTaxonomy', {
		url : '/blog/radio-tomorrow',
		templateUrl : "/screens/taxonomy/blog/taxonomy.html",
		controller : "blogtaxonomyCtrl"
	})
	.state('index.sales-blog', {
		url : '/blog/sales',
		templateUrl : "/screens/taxonomy/blog/taxonomy.html",
		controller : "blogtaxonomyCtrl"
	})
	.state('index.macca-blog', {
		url : '/blog/macca',
		templateUrl : "/screens/taxonomy/blog/taxonomy.html",
		controller : "blogtaxonomyCtrl"
	})
	.state('index.newsTalk', {
		url : '/blog/news-talk',
		templateUrl : "/screens/taxonomy/blog/newsTalk.html",
		controller : "blogtaxonomyCtrl"
	})
	.state('index.production-blog', {
		url : '/blog/production',
		templateUrl : "/screens/taxonomy/blog/taxonomy.html",
		controller : "blogtaxonomyCtrl"
	})

	// On this day

	.state('index.onThisDayDetail', {
		url : '/content/:title',
		templateUrl : "/screens/contenttype/onthisday/detail.html",
		controller : "onthisdaydetailCtrl"
	})
	.state('index.onThisDay', {
		url : '/knowledge/onthisday',
		templateUrl : "/screens/contenttype/onthisday/onthisday.html",
		controller : "onthisdayCtrl"
	})

	// ask a quetion
	.state('index.questionDetail', {
		url : '/question/:title',
		templateUrl : "/screens/contenttype/Ask a Quetion/detail.html",
		controller : "questiondetailCtrl"
	})

	// Recurring subscription page

	.state('index.productDetail', {
		url : '/product/:title',
		templateUrl : "/screens/contenttype/Recurring Subscription/detail.html",
		controller : "productCtrl"
	})
	// Access page

	.state('index.access', {
		url : '/access',
		templateUrl : "/screens/contenttype/Recurring Subscription/access.html",
		controller : "accessCtrl"
	})
	// Basic page

	.state('index.AMpage', {
		url : '/page/:title',
		templateUrl : "/screens/contenttype/Basic Page/detail.html",
		controller : "am_fm_pageCtrl"
	})	
	.state('index.airplay', {
		url : '/knowledge/chart',
		templateUrl : "/screens/contenttype/Basic Page/airplay.html",
		controller : "airplayCtrl"
	})	

	.state('index.search', {
		url : '/search',
		templateUrl : "/screens/search/search.html",
		controller : "searchCtrl"
	})
	
})

app.run(function($rootScope, $state, $storage,servercalls,$location) {
	

   $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
 	$rootScope.base_path = 'http://localhost:3000';
 	$(document).scrollTop(0);
 	$(window).load(function(){
    $(this).scrollTop(0);
});

   	var analyics = {};
   	analyics.url= $location.url();
   	analyics.state= toState.name.replace('index',"");
	servercalls.post('/api/analytics/visit',analyics,function(err,result){
			if(err){
				console.log('analytics',err);
			}
	})

    if(toState.url == ""){

        $state.go('index.home');

        event.preventDefault();
    }
  	if($location.$$url.indexOf('/') == 0 ){
  		var currenturl = $location.$$url.replace('/',"");
		
		var myVar = setInterval(function(){ 
			if(!$("li.parent").html()){
				console.log('not found');
			}else{
			 	clearInterval(myVar);
				$("li.parent").removeClass('active');
				$("li.child").removeClass('active');
				$("div.myclass").addClass('hide');
				if(currenturl !== ""){
					if($("li[link='"+currenturl+"']").hasClass('child')){
						$("li[link='"+currenturl+"']").addClass('active');
						$("li[link='"+currenturl+"']").closest('.myclass').removeClass('hide');
						$("li[link='"+currenturl+"']").closest('.parent').addClass('active');
					} 
						
					if($("li[link='"+currenturl+"']").hasClass('parent')){
						$("li[link='"+currenturl+"']").addClass('active');
						$("li[link='"+currenturl+"'] > .myclass" ).removeClass('hide');
					} 
					
				}else{
					currenturl = 'news';
					$("li[link='"+currenturl+"']").addClass('active');
					$("li[link='"+currenturl+"'] > .myclass" ).removeClass('hide');
				}
			}
		}, 10);
	}

   })
});

app.directive('comment', function(){	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		 controller: function($scope, $element, $attrs, $transclude, servercalls, $state, $rootScope) {
		 	//var storage = $storage('radioinfo');

		 	$scope.saveComment = function(){
				//console.log("uid",storage.$$table.user.local._id);
				
				$scope.comment_data = {};
				$scope.comment_data.data = {};
				$scope.comment_data.uid = $rootScope.loggedInUser._id;
				$scope.comment_data.data.screen_name = $scope.screen_name;
				$scope.comment_data.data.comment = $scope.comment;
				console.log("comment data",$scope.comment_data);
				servercalls.post('/api/content/comment/'+$state.params.title, $scope.comment_data, function(err,data){
					if(err){
						console.log("error while save comment",err);
					}else{
						console.log("comment save successfully");
					}
				})
			}
		 },
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		restrict: 'E',
		// template: '',
		templateUrl: 'js/directive/comment.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};

});
app.directive('askQuestion', function(){	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		 controller: function($scope, $element, $attrs, $transclude) {
		 	$scope.postComment = function(){
				console.log("comment",$scope);
			}
		 },
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		restrict: 'E',
		// template: '',
		templateUrl: 'js/directive/askQuestion.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};

});
app.factory('dialogs', ['ngDialog', function(ngDialog){
	return {
		openMessageDialog : function(message){
			ngDialog.openConfirm({
			 template: '<div class="panel panel-primary"><div class="panel-heading"> <h3 class="panel-title">Message</h3></div><div class="panel-body"> <div>'+message+'</div> <div class="text-right"><button type="submit" ng-click="confirm()" class="btn btn-primary">Ok</button> </div> </div> </div>',
			    plain: true,closeByEscape:true,closeByDocument:true
			});	
		},
		openErrorDialog : function(message){
			ngDialog.openConfirm({
			 template: '<div class="panel panel-red"><div class="panel-heading"> <h3 class="panel-title">Erorr</h3></div><div class="panel-body"> <div>'+message+'</div> <div class="text-right"><button type="submit" ng-click="confirm()" class="btn btn-danger">Ok</button> </div> </div> </div>',
			    plain: true,closeByEscape:true,closeByDocument:true
			});	
		},
		
		openConfirmDialog : function(header,html,cb){
			ngDialog.openConfirm({
				template: '<div class="panel panel-primary"> <div class="panel-heading"> <h3 class="panel-title">'+header+'</h3> </div> <div class="panel-body"><div>'+html+'</div><div class="text-right"> <button ng-click="confirm()" class="table_btns btn btn-sm btn-primary">Confirm</button><button ng-click="closeThisDialog(0)" class="btn btn-sm btn-primary table_btns">Cancel</button> </div></div> </div>',
			    plain: true,closeByEscape:true,closeByDocument:true
			}).then(function(){
				cb(true,null)
			},function(reject){
				cb(null,true)
			});		
		},

		openConfirmCustomDialog : function(header,html,confirm,cb){
			ngDialog.openConfirm({
				template: '<div class="panel panel-primary"> <div class="panel-heading"> <h3 class="panel-title">'+header+'</h3> </div> <div class="panel-body"><div>'+html+'</div><div class="text-right"> <button ng-click="confirm()" class="table_btns btn btn-sm btn-primary">'+confirm+'</button><button ng-click="closeThisDialog(0)" class="btn btn-sm btn-primary table_btns">Cancel</button> </div></div> </div>',
			    plain: true,closeByEscape:true,closeByDocument:true
			}).then(function(){
				cb(true,null)
			},function(reject){
				cb(null,true)
			});		
		},


		// openConfirmDialog : function(){

		// },

	};

}])
app.factory('servercalls', ['$http','$rootScope', function($http,$rootScope){
	return {
		get : function(url,filters,cb){
			$http.get($rootScope.base_path+url+"?query="+encodeURIComponent(JSON.stringify(filters)),{withCredentials: true})
				.success(function(data){ return cb(null,data);})
				.error(function(err){return cb(err,null);})
		},
		put : function(url,data,cb){
			$http.put($rootScope.base_path+url , data,{withCredentials: true})
				.success(function(data){ return cb(null,data);})
				.error(function(err){return cb(err,null);})
		},
		post : function(url,data,cb){
			$http.post($rootScope.base_path+url , data,{withCredentials: true})
				.success(function(data){ return cb(null,data);})
				.error(function(err){return cb(err,null);})
		},
		delete: function(url,data,cb){
			$http.delete($rootScope.base_path+url , data,{withCredentials: true})
				.success(function(data){ return cb(null,data);})
				.error(function(err){return cb(err,null);})
		},
	};

}])
app.filter('htmlToPlaintext', function(){
	return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
})
app.filter('trim', function(){
	return function(text,length) {
      return  text ? String(text).substr(0,length) : '';
    };
})
app.controller('questiondetailCtrl', ['$scope','$state','servercalls', function($scope,$state,servercalls){
	$scope.content = {};
	$scope.comment = '';
	servercalls.get('/api/content/'+$state.params.title, {}, function(err, data){
		if(err){
			console.log("err",err);
		}else{
			console.log("data in question detail",data);
			$scope.content.title = data.title;
			$scope.content.name = data.fields.screen_name;
			$scope.content.body = data.fields.question.data;
		}		
	})
	// $scope.postComment = function(){
	// 	console.log("comment",$scope.comment);
	// }
}])
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
app.controller('hotnewsdetailCtrl', ['$scope','$state','servercalls','$sce', function($scope,$state,servercalls,$sce){
	$scope.content = {};
	servercalls.get('/api/content/'+$state.params.title, {}, function(err, data){
		if(err){
			console.log("err",err);
		}else{
			console.log("data in hot news",data);
			$scope.content.title = data.title;
			$scope.content.body = data.fields.description.data;
			$scope.content.image = data.fields.image.url;
			$scope.content.link = data.fields.link;
			$scope.content.source = data.fields.source;
			// //$scope.content.category = data.fields.category[0].label;
		}
		
	})
	// function findOjb(data){
	// 	for (var key in data) {
	// 	  if (data.hasOwnProperty(key)) {
	// 	  	if(typeof data[key] == 'object' && (key == 'fields' || key == 'body' )){
	// 	  		findOjb(data[key]);
	// 	  		//console.log(key + " -> " + data[key]);
	// 	  	}else{
	// 	  		console.log(key + " -> " + data[key]);

	// 	    	$scope.content[key] = data[key];	
	// 	    	console.log(">>>>>>",$scope.content[key]);	  		
	// 	  	}
	// 	  }
	// 	}
	// }
}])
app.controller('hotnewslistCtrl', ['$scope','$sce','servercalls', function($scope,$sce,servercalls){
 	$scope.content = {};	
	$scope.listType = "Hot News";
	//default config for pagination work
	$scope.count = 0;
	$scope.currentpage =1 ;
	$scope.limit =5;

	$scope.config = {
		filter : {'contenttype_machine_name' : 'hot_news'},
		'skip' : 0,
	 	'limit' : $scope.limit,
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
				$scope.content = result;
				console.log("hot news result",result);
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

}])

app.controller('jobsdetailCtrl', ['$scope','$state','servercalls','$sce', function($scope,$state,servercalls,$sce){
	$scope.content = {};
	$scope.jobList = {};
	servercalls.get('/api/content/'+$state.params.title, {}, function(err, data){
		if(err){
			console.log("err",err);
		}else{
			console.log("data in jobs",data);
			$scope.content.title = data.title;
			$scope.content.body = data.fields.description.data;
			$scope.content.apply_before = data.fields.apply_before
			// //$scope.content.category = data.fields.category[0].label;
		}
		
	})
	var job_list_config = {
		filter : {
			'contenttype_machine_name' : 'advertisement',
			'fields.banner_position' : 'Job list'
		},
		sort : { created_on : -1 },
		limit : "1"
	}
	servercalls.get('/api/content/all', job_list_config, function(err, result){
		if(err){
			console.log("err",err);
		}else{
			$scope.jobList = result[0];
			$scope.jobList.image = result[0].fields.banner_image.url;
			$scope.jobList.link = result[0].fields.link;
			console.log("ads section job_list_config",result);
		}
	});

	var myVar = setInterval(function(){ 
		
		if($('div[ng-bind-html="content.body"] img').attr('src')){
			clearInterval(myVar);
			$('div[ng-bind-html="content.body"] img').attr('src' ,"https://www.radioinfo.com.au"+$('div[ng-bind-html="content.body"] img').attr('src') );
		}
	}, 10);
	// function findOjb(data){
	// 	for (var key in data) {
	// 	  if (data.hasOwnProperty(key)) {
	// 	  	if(typeof data[key] == 'object' && (key == 'fields' || key == 'body' )){
	// 	  		findOjb(data[key]);
	// 	  		//console.log(key + " -> " + data[key]);
	// 	  	}else{
	// 	  		console.log(key + " -> " + data[key]);

	// 	    	$scope.content[key] = data[key];	
	// 	    	console.log(">>>>>>",$scope.content[key]);	  		
	// 	  	}
	// 	  }
	// 	}
	// }
}])
app.controller('jobslistCtrl', ['$scope','$sce','servercalls', function($scope,$sce,servercalls){
 	$scope.content = {};	
 	$scope.jobList = {};	
	$scope.listType = "Jobs";
	//default config for pagination work
	$scope.count = 0;
	$scope.currentpage =1 ;
	$scope.limit =20;

	$scope.config = {
		filter : {
			'contenttype_machine_name' : 'new_job_vacancy',
			'publish' : 'true'
		},
		'skip' : 0,
	 	'limit' : $scope.limit,
	}
	// show advertisement whose position is Job list
	var job_list_config = {
		filter : {
			'contenttype_machine_name' : 'advertisement',
			'fields.banner_position' : 'jobs list'
		},
		sort : { created_on : -1 },
		limit : "1"
	}
	servercalls.get('/api/content/all', job_list_config, function(err, result){
		if(err){
			console.log("err",err);
		}else{
			//console.log("ads section job_list_config",result);
			$scope.jobList = result[0];
			$scope.jobList.image = result[0].fields.banner_image.url;
			$scope.jobList.link = result[0].fields.link;
		}
	});

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
		servercalls.get('/api/content/jobs',$scope.config,function(err,result){
			if(err){$scope.error = err; console.log(err); return;}
			else{
				$scope.content = result;
				// result.forEach(function(item){
				// 	if(item.hasOwnProperty('fields')){
				// 		for(var key in item.fields){							
				// 			if(key == 'station'){
				// 				console.log("key",item.fields[key][0]._id);
				// 			}
				// 		}
				// 		//console.log("item fields",item.fields);
				// 	}
					
				// })
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

}])

app.controller('accessCtrl', ['$scope','servercalls', function($scope,servercalls){

	$scope.content = {};
	$scope.type = 'Instant Access';

	// get filed in content types recurring_subscription

	$scope.individual = {};
	$scope.community = {};

	// get fields allowed value
	$scope.individual_value = {};
	$scope.community_value = {};

	// get fields duration allowed value
	$scope.individual_duration = {};
	$scope.community_duration = {};

	servercalls.get('/api/contenttype/recurring_subscription', {}, function(err,data){
		if(err){
			console.log(err);
		}else{
			//console.log("fields in recurring_subscription",data);
			data.fields.forEach(function(item){
				//console.log("item",item);
				if(item.machine_name == 'individual_payment_option'){
					$scope.individual_value = item.allowed_values;
				}
				if(item.machine_name == 'community_stations_payment_option'){
					$scope.community_value = item.allowed_values;
				}
				if(item.machine_name == 'individual_duration_amount'){
					$scope.individual_duration_amount = item.allowed_values;
				}
				if(item.machine_name == 'community_stations_duration_amount'){
					$scope.community_duration_amount = item.allowed_values;
				}
			})
		}
	})

	// get all content of type recurring_subscription
	$scope.config = {
		filter : {
			'contenttype_machine_name' : 'recurring_subscription'
		},
		sort : { created_on : -1 },
	}
	servercalls.get('/api/content/all', $scope.config, function(err,data){
		if(err){
			console.log(err);
		}else{
			//console.log("data in access recurring_subscription",data);
			$scope.content = data;
		}
	})

	$scope.individualSubscription = function(){
		//console.log("individualSubscription",$scope.individual_duration_amount[$scope.individual.individual_option]);
	}

	$scope.communitySubscription = function(){
		//console.log("communitySubscription",$scope.community_duration_amount[$scope.community.community_option]);
	}
	
}])
app.controller('productCtrl', ['$scope','$state','servercalls','$rootScope', function($scope,$state,servercalls,$rootScope){
	
	$scope.content = {}	;
	servercalls.get('/api/contenttype/recurring_subscription', {}, function(err,data){
		if(err){
			console.log(err);
		}else{
			data.fields.forEach(function(item){
				if(item.machine_name == 'individual_payment_option'){
					$scope.content.individual_value = item.allowed_values;
				}
				if(item.machine_name == 'community_stations_payment_option'){
					$scope.content.community_value = item.allowed_values;
				}
				if(item.machine_name == 'individual_duration_amount'){
					$scope.content.individual_duration = item.allowed_values;
				}
				if(item.machine_name == 'community_stations_duration_amount'){
					$scope.content.community_duration = item.allowed_values;
				}
			})
		}
	})

	// get content of type recurring_subscription
	
	servercalls.get('/api/content/'+$state.params.title, {}, function(err,data){
		if(err){
			console.log(err);
		}else{
			console.log("data in recurring_subscription",data);
			$scope.content.data = data;
		}
	})

	$scope.individualSubscription = function(){

	}
	$scope.communitySubscription = function(){
		
	}
}])
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
app.controller('advlistCtrl', ['$scope','$sce','$state','servercalls', function($scope,$sce,$state,servercalls){
 	$scope.content = {};	
	$scope.listType = "Advertisement";
	
	//default config for pagination work
	$scope.count = 0;
	$scope.currentpage =1 ;
	$scope.limit =5;

	$scope.config = {
		filter : {'contenttype_machine_name' : 'advertisement'},
		'skip' : 0,
	 	'limit' : $scope.limit,
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
				$scope.content = result;
				console.log("advertisement result",result);
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
	

}])

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
app.controller('brainTrustCtrl', ['$scope','$sce','servercalls','$rootScope', function($scope,$sce,servercalls,$rootScope){
 	$scope.content = {};	
	$scope.listType = "The BrainsTrust";
	//default config for pagination work
	$scope.count = 0;
	$scope.currentpage =1 ;
	$scope.limit =5;
	//$scope.screen_name = '';
	$scope.question_data = {};
	$scope.answer = {};

	// get all content of content type brain_trust_panelist
	$scope.config = {
		filter : {'contenttype_machine_name' : 'brain_trust_panelist'},
		'skip' : 0
	}
	get_contents();

	function get_contents(){
		servercalls.get('/api/content/all',$scope.config,function(err,result){
			if(err){$scope.error = err; console.log(err); return;}
			else{
				$scope.content = result;
				//console.log("brain trust result",result);
				//getcount();
			}
		})
	}
	if($rootScope.loggedInUser){
		$scope.screen_name = $rootScope.loggedInUser.local.username;
		//console.log("screen name",$scope.screen_name);
	}

	$scope.saveQuestion = function(){

	}
	// get latest Question, 
	$scope.que_config = {
		filter : {
			'contenttype_machine_name' : 'ask_a_question'
		},
		sort : { created_on : -1 },
		limit : 1,
		skip : 0		
	}	
	servercalls.get('/api/content/all',$scope.que_config,function(err,result){
		if(err){
			$scope.error = err;
			console.log("-------",err);
			return;
		}
		else{
			$scope.question_data.title = result[0].title;
			$scope.question_data.data = $sce.trustAsHtml(result[0].fields.question.data);
			$scope.question_data.machine_name = result[0].machine_name;
			console.log("question in brain trust",result);
		}
	})
	// get Answer for the latest Question at brain-trust
	$scope.que_config = {
		filter : {
			'contenttype_machine_name' : 'answer',
			'fields.ask_a_question.machine_name' : $scope.question_data.machine_name

		},
		sort : { created_on : -1 },
		limit : 1,
		skip : 0		
	}	
	servercalls.get('/api/content/all',$scope.que_config,function(err,result){
		if(err){
			$scope.error = err;
			//console.log("-------",err);
			return;
		}
		else{
			 $scope.answer = result[0];
			// $scope.question_data.data = $sce.trustAsHtml(result[0].fields.question.data);
			console.log("answer in brain trust",result);
		}
	})
}])

app.controller('newsdetailCtrl', ['$scope','$state','servercalls','$rootScope', function($scope,$state,servercalls,$rootScope){
	$scope.content = {};
	$scope.postcomment = false;
	$scope.comments = {};
	$scope.comment_length = '';
	$scope.no_user = false;
	$scope.screen_name = '';

	//$scope.workflow_state = "approved";
	//var storage = $storage('radioinfo');
	if($rootScope.loggedInUser){
		$scope.screen_name = $rootScope.loggedInUser.local.username;
	}
	servercalls.get('/api/content/'+$state.params.title, {}, function(err, data){
		if(err){
			console.log("err",err);
		}else{
			
			$scope.content = data;
			console.log("data in news detail",$scope.content);
			$scope.content.title = data.title;
			// $scope.content.body = data.fields.body.data;
			// $scope.content.image = data.fields.image.url;
			// $scope.content.caption = data.fields.image_caption;
			$scope.comment_length = data.user_comments.length;
			if(data.user_comments.length > 0){
				$scope.comments = data.user_comments;
			}
			// //$scope.content.category = data.fields.category[0].label;
		}
		
	})
	$scope.postComment = function(){
		if($rootScope.loggedInUser){
			$scope.postcomment = true;
		}else{
			$scope.no_user = true;
		}		
		//console.log("$scope.postcomment", $scope.postcomment);
	}
}])
app.controller('newslistCtrl', ['$scope','$sce','servercalls', function($scope,$sce,servercalls){
 	$scope.content = {};	
	$scope.listType = "News";
	//default config for pagination work
	$scope.count = 0;
	$scope.currentpage =1 ;
	$scope.limit =5;

	$scope.config = {
		filter : {'contenttype_machine_name' : 'news'},
		'skip' : 0,
	 	'limit' : $scope.limit,
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
				$scope.content = result;
				console.log("news result",result);
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

}])

app.controller('c_and_g_detailCtrl', ['$scope','$state','servercalls','$sce', function($scope,$state,servercalls,$sce){
	$scope.content = {};
	console.log("comming and going state",$state);
	servercalls.get('/api/content/'+$state.params.title, {}, function(err, data){
		if(err){
			console.log("err",err);
		}else{
			console.log("data in detail",data);
			$scope.content.title = data.title;
			$scope.content.body = data.fields.body.data;
			$scope.content.image = data.fields.image.url;
			$scope.content.created_on = data.created_on;
			// //$scope.content.category = data.fields.category[0].label;
		}
		
	})
	// function findOjb(data){
	// 	for (var key in data) {
	// 	  if (data.hasOwnProperty(key)) {
	// 	  	if(typeof data[key] == 'object' && (key == 'fields' || key == 'body' )){
	// 	  		findOjb(data[key]);
	// 	  		//console.log(key + " -> " + data[key]);
	// 	  	}else{
	// 	  		console.log(key + " -> " + data[key]);

	// 	    	$scope.content[key] = data[key];	
	// 	    	console.log(">>>>>>",$scope.content[key]);	  		
	// 	  	}
	// 	  }
	// 	}
	// }
}])
app.controller('c_and_g_listCtrl', ['$scope','$sce','servercalls', function($scope,$sce,servercalls){
 	$scope.content = {};	
	$scope.listType = "Comings and Goings";
	//default config for pagination work
	$scope.count = 0;
	$scope.currentpage =1 ;
	$scope.limit =5;

	$scope.config = {
		filter : {'contenttype_machine_name' : 'comings_and_goings'},
		'skip' : 0,
	 	'limit' : $scope.limit,
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
				$scope.content = result;
				console.log("commings_and_goings result",result);
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

}])

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
app.controller('onthisdayCtrl', ['$scope','servercalls','$sce', function($scope,servercalls,$sce){
	$scope.content = {};

	$scope.content.month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	$scope.content.day = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];

	//set the title
	$scope.content.type = "On This Day";
	
	$scope.config = {
		filter : {
			'contenttype_machine_name' : 'on_this_day',
		},
		sort : { created_on : -1 },
		limit : "1"
	}
	getEvents($scope.config);
	function getEvents(data){
		console.log("data",data);
		servercalls.get('/api/content/all', data, function(err, result){
			if(err){
				$scope.error = err;
				console.log("err",err);
			}else if(result.length == 0){
				$scope.error = "There is no Events Added for the selected data."
				$scope.content.body = '';
			}else{
				console.log(" on this day",result);
				$scope.content.body = result[0].fields.text.data;
				$scope.month = result[0].fields.month;
				$scope.day = result[0].fields.day;
			}
		});
	}
	

	$scope.update = function (){
		$scope.error = null;
		//console.log("on update",$scope);
			$scope.config = {
			filter : {
				'contenttype_machine_name' : 'on_this_day',
				'fields.day' : $scope.day,
				'fields.month' : $scope.month,
			},
			sort : { created_on : -1 },
			limit : "1"
		}
		getEvents($scope.config);
	}
	
}])
app.controller('blogtaxonomyCtrl', ['$scope','$state','servercalls','$location','$sce', function($scope,$state,servercalls,$location,$sce){
	console.log("location",$location.$$url);
	$scope.content = {};
	
	$scope.count = 0;
	$scope.currentpage =1 ;
	$scope.limit =5;

	if($location.$$url == "/blog/radio-tomorrow"){
		$scope.taxonomyType = "Radio Tomorrow with James Cridland";
		$scope.blog_category_machine_name = 'radio_tomorrow_with_james_cridland';

	}else if($location.$$url == "/blog/macca"){
		$scope.taxonomyType = "Weird Wonderful World";
		$scope.blog_category_machine_name = 'weird_wonderful_world';

	}else if($location.$$url == "/blog/production"){
		$scope.taxonomyType = "Creative & Production";
		$scope.blog_category_machine_name = 'creative__production';		
	}
	else if($location.$$url == "/blog/sales"){
		$scope.taxonomyType = "Selling Radio Direct";
		$scope.blog_category_machine_name = 'selling_radio_direct';		
	}
	else if($location.$$url == "/blog/news-talk"){
		$scope.taxonomyType = "NewsTalk Edge";
		$scope.blog_category_machine_name = 'newstalk_edge';		
	}
	$scope.tax_config = {
		filter : {"fields.blog_category.machine_name" : $scope.blog_category_machine_name, "contenttype_machine_name" : "blog_post"},
		'skip' : 0,
		'limit' : $scope.limit
	}
	
	//get total pages count
	function getTotalPages(){
		return $scope.getTotalPages = Math.ceil($scope.count / $scope.tax_config.limit);
	}
	//next page work
	$scope.nextPage = function(){
		if($scope.currentpage < $scope.getTotalPages){
			$scope.currentpage++;
			$scope.tax_config.skip = $scope.tax_config.skip + $scope.limit;
			get_contents();	
		}
	}
	//previous page work
	$scope.previousPage = function(){
		if($scope.currentpage > 1 ){
			$scope.currentpage--;
			$scope.tax_config.skip = $scope.tax_config.skip - $scope.limit;
			get_contents();	
		}
	}

	//for first time contents
	get_contents();
	getcount();


	
	function get_contents(){
		servercalls.get('/api/content/all', $scope.tax_config, function(err,result){
			if(err){$scope.error = err; console.log(err); return;}
			else{
				$scope.content = result;
				console.log("blog result",result);
				getcount();
			}
		})
	}

	function getcount(){
		servercalls.get('/api/content/all/count', $scope.tax_config, function(err,result){
			if(err){console.log(err);return;}
			else{
				$scope.count = result;
				getTotalPages();
			}
		})
	}

	var myVar1 = setInterval(function(){ 
		if($('div[ng-bind-html="row.fields.description.data | trim: 500"] img').attr('src')){
		var tn_array = $('div[ng-bind-html="row.fields.description.data | trim: 500"] img').map(function() {
		  return $(this).attr("src");
		});

		$.each(tn_array, function(index,value){
			console.log("impage path",$('div[ng-bind-html="row.fields.description.data | trim: 500"] img[src="'+value+'"]'));
			if($('div[ng-bind-html="row.fields.description.data | trim: 500"] img').attr('src').indexOf('https://www.radioinfo.com.au') == -1){
			 $('div[ng-bind-html="row.fields.description.data | trim: 500"] img[src="'+value+'"]').attr('src',"https://www.radioinfo.com.au"+value);
			}
		})
			clearInterval(myVar1);
			 //$('div[ng-bind-html="row.fields.description.data | trim: 500"] img').attr('src' ,"https://www.radioinfo.com.au"+$('div[ng-bind-html="row.fields.description.data | trim: 500"] img').attr('src') );
		}
	}, 100);

}])

app.controller('austaxonomyCtrl', ['$scope','$state','servercalls','$location', function($scope,$state,servercalls,$location){
	console.log("location",$location.$$url);
	$scope.content = {};
	
	$scope.count = 0;
	$scope.currentpage =1 ;
	$scope.limit =5;

	if($location.$$url == "/news/aus"){
		$scope.taxonomyType = "Australian News";

		$scope.tax_config = {
		filter : {"fields.category.machine_name" : {$nin : ['technology_news','world_news']}, "contenttype_machine_name" : "news"},
		'skip' : 0,
		'limit' : $scope.limit
		}
	}else if($location.$$url == "/news/world"){
		$scope.taxonomyType = "World News";

		$scope.tax_config = {
		filter : {"fields.category.machine_name" : 'world_news', "contenttype_machine_name" : "news"},
		'skip' : 0,
		'limit' : $scope.limit
		}
	}else if($location.$$url == "/news/tech"){
		$scope.taxonomyType = "Technology News";

		$scope.tax_config = {
		filter : {"fields.category.machine_name" : 'technology_news', "contenttype_machine_name" : "news"},
		'skip' : 0,
		'limit' : $scope.limit
		}
	}
	
	//get total pages count
	function getTotalPages(){
		return $scope.getTotalPages = Math.ceil($scope.count / $scope.tax_config.limit);
	}
	//next page work
	$scope.nextPage = function(){
		if($scope.currentpage < $scope.getTotalPages){
			$scope.currentpage++;
			$scope.tax_config.skip = $scope.tax_config.skip + $scope.limit;
			get_contents();	
		}
	}
	//previous page work
	$scope.previousPage = function(){
		if($scope.currentpage > 1 ){
			$scope.currentpage--;
			$scope.tax_config.skip = $scope.tax_config.skip - $scope.limit;
			get_contents();	
		}
	}

	//for first time contents
	get_contents();
	getcount();


	
	function get_contents(){
		servercalls.get('/api/content/all', $scope.tax_config, function(err,result){
			if(err){$scope.error = err; console.log(err); return;}
			else{
				$scope.content = result;
				console.log("news result",result);
				getcount();
			}
		})
	}

	function getcount(){
		servercalls.get('/api/content/all/count', $scope.tax_config, function(err,result){
			if(err){console.log(err);return;}
			else{
				$scope.count = result;
				getTotalPages();
			}
		})
	}
}])


app.controller('taxonomyCtrl', ['$scope','$state','servercalls', function($scope,$state,servercalls){
	
	$scope.content = {};

	$scope.count = 0;
	$scope.currentpage =1 ;
	$scope.limit =5;
	console.log("state params",$state.params.tax);
	$scope.tax_config = {
		filter : {"fields.category.machine_name" : $state.params.tax},
		'skip' : 0,
		'limit' : $scope.limit
	}
	//get total pages count
	function getTotalPages(){
		return $scope.getTotalPages = Math.ceil($scope.count / $scope.tax_config.limit);
	}
	//next page work
	$scope.nextPage = function(){
		if($scope.currentpage < $scope.getTotalPages){
			$scope.currentpage++;
			$scope.tax_config.skip = $scope.tax_config.skip + $scope.limit;
			get_contents();	
		}
	}
	//previous page work
	$scope.previousPage = function(){
		if($scope.currentpage > 1 ){
			$scope.currentpage--;
			$scope.tax_config.skip = $scope.tax_config.skip - $scope.limit;
			get_contents();	
		}
	}

	//for first time contents
	get_contents();
	getcount();


	
	function get_contents(){
		servercalls.get('/api/content/all', $scope.tax_config, function(err,result){
			if(err){$scope.error = err; console.log(err); return;}
			else{
				$scope.content = result;
				console.log("news result",result);
				var category = _.findWhere(result[0].fields.category,{machine_name : $state.params.tax});
				$scope.taxonomyType = category.label.replace(new RegExp('-', 'g'),' ');
				getcount();
			}
		})
	}

	function getcount(){
		servercalls.get('/api/content/all/count', $scope.tax_config, function(err,result){
			if(err){console.log(err);return;}
			else{
				$scope.count = result;
				getTotalPages();
			}
		})
	}
}])

// > db.contents.find({"fields" :{"category":{"machin_name" : {$in : ['creative__production']} }}}).pretty()


//db.contents.find({"fields" :{"category": {$in : [{'machin_name' : 'creative__production'}]} }}).pretty()

// db.contents.find({"fields" :{"category.machine_name" : "creative__production"}}).pretty()


//db.contents.find({"fields.category.machine_name" : "creative__production"}).pretty()

app.controller('changePasswordCtrl', ['$scope','servercalls','$state', function($scope,servercalls,$state){
	$scope.user = {};
	$scope.changePassword = function(){
		if($scope.user.npassword == $scope.user.cnpassword){
			console.log($scope.user);
			servercalls.put('/api/users/change/password', $scope.user, function(err, result){
				if(err){
					console.log("error",err);
					$scope.error = err;
				}else{
					$state.go('index.home');
				}
			})
		}else{
			$scope.error = 'Password doesn\'t match ';
		}
	}
}])
app.controller('profileCtrl', ['$scope','servercalls','$state','$storage','$rootScope', function($scope,servercalls,$state,$storage,$rootScope){
	$scope.user = {};
	$rootScope.$emit('SucessMessage', {});
	
	var storage = $storage('radioinfo');
	var user = storage.getItem('user');
	// console.log("storage profile",storage);
	servercalls.get('/api/users/'+user._id, {}, function(err, result){
		if(err){
			console.log("err",err);
		}else{
			$scope.user = result;
			console.log("profile result",result);
		}
	})

	$scope.save = function() {
	    if ($scope.user.password != undefined || $scope.user.password1 != undefined) {
	        console.log('any password exist' ,$scope.user);
	        if ($scope.user.password == $scope.user.password1) {
	        	$scope.user.local.password = $scope.user.password;
	        } else {
	            $scope.error = ['Password doesn\'t match '];
	        }
	    }
        console.log("user profile update is called",$scope.user);
        servercalls.put('/api/users/' +user._id, $scope.user, function(err, result) {
            if (err) {
                err.ermessage ? $scope.error = err.ermessag : "";
                console.log(err);
                return;
            } else {
            	if(result._id == user._id){
	            	$rootScope.loggedInUser = result;
	            	storage.setItem('user', result);
	            	$state.go('index.home').then(function(){
		            	$rootScope.$emit('SucessMessage', {sm : 'User updated sucessfully'});
	            	}
		            )
            	}
            }
        })	    
	}
}])
app.controller('resetPasswordCtrl', ['$scope','$state','servercalls', function($scope,$state,servercalls){
	$scope.user = {};

	console.log("stateParams",$state.params);
	$scope.resetPassword = function(){
		if($scope.user.local.password == $scope.user.cpassword){
			console.log("password match");
			var config = {
				'filter' : {
					'local.email' : $state.params.eid
				}
			};
			servercalls.get('/api/users/all', config, function(err, result){
				if(err){
					$scope.error = err;
				}else if($state.params.token != result[0].verification_code){
					$scope.error = "User token is invalid";
				}else{
					servercalls.put('/api/users/'+result[0]._id, $scope.user, function(err, result){
						if(err){
							console.log("error while reset the user password");
						}else{

							console.log("password reset successfull");
							$state.go('index.login');
						}
					})
				}
			})
		}else{
			$scope.error = 'Password doesn\'t match ';
		}
	}
}]);
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
	
	$rootScope.base_path = 'http://localhost:3000'; 
	// $rootScope.base_path = 'https://server.lr.com'; 



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
app.controller('loginCtrl', ['$scope','$state','servercalls','$storage','$rootScope', function($scope,$state,servercalls,$storage,$rootScope){

	$scope.user = {};
	$scope.error='';
	var storage = $storage('radioinfo');
	var user = storage.getItem('user');
	if(user){
		$state.go('index.home');
	}
	if($state.params.token  && $state.params.email){
		servercalls.post('/api/users/verify/'+$state.params.email+'/'+$state.params.token,{},function(err,result){
			if(err){console.log('eeeeeee',err);return}
			else{
				if(result._id){
					$scope.message = " verification Done..";
				}else{
					$scope.message = "Something is Wrong";	
				}
			}
		})
	}

	$scope.forgotPassword = function(){
		var config = {
			'filter' : {
				'local.email' : $scope.user.email
			}
		};
		console.log("forgotPassword", $scope.user);
		servercalls.get('/api/users/reset/password', config, function(err, result){
			if(err){
				$scope.error= err;
				console.log("-----",err);
			}else{
				console.log("result",result);
			}
		})
	}

	$scope.login = function(){
		console.log("loginCtrl");
		$scope.message= '';
		servercalls.post('/api/users/login',$scope.user,function(err,result){
			if(err){
				if(err.ermessage){
					$scope.error = err.ermessage.username ? err.ermessage.username : err.ermessage.password;
				}else{
					console.log("error in rest api, see console on server",err);
				}
				return;
			}else{
				var storage = $storage('radioinfo');
				storage.setItem('user', result);
				console.log("root scpoe",$rootScope);
				$rootScope.loggedInUser = result;
				$state.go('index.home');
			}
		})
	}



}]);
app.controller('registerCtrl', ['$scope','servercalls','$state','vcRecaptchaService','$http', function($scope,servercalls,$state,vcRecaptchaService,$http){
	$scope.user={};
	$scope.model = {
        key: '6LcsaxgTAAAAAJDxdchu_UhdRi6x0CAhBC0tyarz'        
    };
    var URL = 'https://www.google.com/recaptcha/api/siteverify?secret=6LcsaxgTAAAAABQTgOs47gF8ER4LY2YjVhuc7ofT';
    // var response1 = vcRecaptchaService.getResponse();
    // console.log("response",response1);
    // var params = {
    // 	'secret' : '6LcsaxgTAAAAABQTgOs47gF8ER4LY2YjVhuc7ofT'
    // }
    // var header = {
    // 	dataType: 'jsonp'
    // }
    $scope.setResponse = function (response) {
        console.info('Response available');
        //params.response = response;
        $scope.user.response = response;
        console.log("response",$scope.user.response);
    };
	$scope.register = function(){
		if($scope.user.response != undefined){
			if($scope.user.local.password == $scope.user.local.confirmPassword){		
				console.log("create data",$scope.user);

				servercalls.post('/api/users/register',$scope.user,function(err,result){
					if(err){
						//$scope.error = err.ermessage;
						console.log(err);
						return
					}
					else{
						alert('User created Successfully');
					}
				})
			}else{
				//$scope.error = 'Password doesn\'t match ';
				console.log("password does not match");
			}
		}else{
			//$scope.error = 'reCaptcha is not selected';
			console.log("reCaptcha unchecked");
		}
	}
}]);
app.controller('searchCtrl', ['$scope','servercalls',"$state", function($scope,servercalls,$state){
 	$scope.content = {};	
	$scope.listType = "News";
	//default config for pagination work
	$scope.count = 0;
	$scope.currentpage =1 ;
	$scope.limit =5;

	$scope.searchdata = function(){

	}

	$scope.config = {
		filter : {'contenttype_machine_name' : 'news'},
		'skip' : 0,
	 	'limit' : $scope.limit,
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
				$scope.content = result;
				console.log("news result",result);
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

}])
