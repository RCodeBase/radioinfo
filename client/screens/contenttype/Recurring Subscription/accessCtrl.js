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