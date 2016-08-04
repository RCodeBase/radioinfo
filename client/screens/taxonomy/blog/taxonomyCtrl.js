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
