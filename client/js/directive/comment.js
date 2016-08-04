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