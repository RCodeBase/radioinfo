app.factory('servercalls', ['$http','RadioInfoConstant', function($http,RadioInfoConstant){
	return {
		get : function(url,filters,cb){
			return $http.get(RadioInfoConstant.BASE_URL+url+"?query="+JSON.stringify(filters),{withCredentials: true})
				.success(function(data){ return cb(null,data);})
				.error(function(err){return cb(err,null);})
		},
		put : function(url,data,cb){
			$http.put(RadioInfoConstant.BASE_URL+url , data,{withCredentials: true})
				.success(function(data){ return cb(null,data);})
				.error(function(err){return cb(err,null);})
		},
		post : function(url,data,cb){
			$http.post(RadioInfoConstant.BASE_URL+url , data,{withCredentials: true})
				.success(function(data){ return cb(null,data);})
				.error(function(err){return cb(err,null);})
		},
		delete: function(url,cb){
			$http.delete(RadioInfoConstant.BASE_URL+url , {withCredentials: true})
				.success(function(data){ return cb(null,data);})
				.error(function(err){return cb(err,null);})
		},
	};

}])