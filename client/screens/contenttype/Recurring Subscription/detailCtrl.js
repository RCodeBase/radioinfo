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