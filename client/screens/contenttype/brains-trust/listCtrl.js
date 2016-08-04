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
