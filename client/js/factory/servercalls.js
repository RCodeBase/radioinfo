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