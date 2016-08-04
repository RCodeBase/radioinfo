
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
