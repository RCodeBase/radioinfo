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