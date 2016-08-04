var app = angular.module('myRadio',['ui.router','ui.grid','ngDialog','ui.grid.pagination','ui.grid.edit','ui.grid.draggable-rows','ngSanitize','localStorageModule','ngCkeditor','ntt.TreeDnD','ngFileUpload','ngTagsInput'],function($compileProvider){
	
	 $compileProvider.directive('compile', function($compile) {
      // directive factory creates a link function
      return function(scope, element, attrs) {
        scope.$watch(
          function(scope) {
             // watch the 'compile' expression for changes
            return scope.$eval(attrs.compile);
          },
          function(value) {
            // when the 'compile' expression changes
            // assign it into the current DOM
            element.html(value);

            // compile the new DOM and link it to the current
            // scope.
            // NOTE: we only compile .childNodes so that
            // we don't get into infinite loop compiling ourselves
           $compile(element.contents())(scope);
           
          }
        );
      };
    });
});
app.constant('RadioInfoConstant', {'BASE_URL':'http://localhost:3000'});

app.config(function($stateProvider,$urlRouterProvider,$locationProvider){
	$urlRouterProvider.otherwise('/dashboard');
	$locationProvider.html5Mode(true);
	$stateProvider
	.state('login', {
		url : '/login',
		templateUrl : "/screens/login/login.html",
		controller : "loginCtrl",
		withoutlogin : true
	})
	.state('install', {
		url : '/install',
		templateUrl : "/screens/install/install.html",
		controller : "installCtrl",
		install : true
	})

	.state('dashboard', {
		url : '',
		templateUrl : "/screens/dashboard/dashboard.html",
		controller : "dashboardCtrl"
	})

	//
	.state('dashboard.home', {
		url : '/dashboard',
		templateUrl : "/screens/home/home.html",
		controller : "HomeCtrl"
	})

	//Roles states
	.state('dashboard.roles', {
		url : '/roles',
		templateUrl : "/screens/roles/roles.html",
		controller : "rolesCtrl"
	})
	.state('dashboard.users', {
		url : '/users',
		templateUrl : "/screens/users/users.html",
		controller : "usersCtrl"
	})
	.state('dashboard.users_create', {
		url : '/user/create',
		templateUrl : "/screens/users/create/create.html",
		controller : "usersCreateCtrl"
	})
	.state('dashboard.profile', {
		url : '/user/profile',
		templateUrl : "/screens/profile/profile.html",
		controller : "profileCtrl"
	})
	.state('dashboard.users_edit', {
		url : '/users/:uid/edit',
		templateUrl : "/screens/users/edit/edit.html",
		controller : "usersEditCtrl"
	})
	//Permission states
	.state('dashboard.permissions', {
		url : '/permissions',
		templateUrl : "/screens/permissions/permissions.html",
		controller : "permissionsCtrl"
	})
	//Taxonomy related states
	.state('dashboard.taxonomy', {
		url : '/taxonomy',
		templateUrl : "/screens/taxonomy/taxonomy.html",
		controller : "taxonomyCtrl"
	})
	.state('dashboard.taxonomy_term', {
		url : '/taxonomy/:taxonomy_m_name',
		templateUrl : "/screens/taxonomy/term.html",
		controller : "termCtrl"
	})

	//menus related states
	.state('dashboard.groups', {
		url : '/groups',
		templateUrl : "/screens/menus/groups/groups.html",
		controller : "groupsCtrl"
	})

	.state('dashboard.groups_menus', {
		url : '/groups/:machine_name',
		templateUrl : "/screens/menus/groups_menus/groups_menus.html",
		controller : "groupMenusCtrl"
	})

	//content types
	.state('dashboard.contenttypes', {
		url : '/contenttypes',
		templateUrl : "/screens/contenttypes/contenttypes.html",
		controller : "ContentTypesCtrl"
	})
	.state('dashboard.contenttypes_fields', {
		url : '/contenttypes/:ct_machine_name/fields',
		templateUrl : "/screens/contenttypes/fields/fields.html",
		controller : "ContentTypesFieldsCtrl"
	})
	.state('dashboard.fields_create', {
		url : '/contenttypes/:ct_machine_name/fields/create',
		templateUrl : "/screens/contenttypes/fields/createfields/createfields.html",
		controller : "CreateFieldCtrl"
	})
	.state('dashboard.fields_edit', {
		url : '/contenttypes/:ct_machine_name/fields/:machine_name/edit',
		templateUrl : "/screens/contenttypes/fields/editfields/editfields.html",
		controller : "EditFieldCtrl"
	})

	//contents
	.state('dashboard.content', {
		url : '/content',
		templateUrl : "/screens/content/content.html",
		controller : "contentCtrl"
	})
	.state('dashboard.contentadd', {
		url : '/content/add',
		templateUrl : "/screens/content/contentadd/contentadd.html",
		controller : "contentAddCtrl"
	})

	.state('dashboard.createcontent', {
		url : '/content/:ct_machine_name/create',
		templateUrl : "/screens/content/createcontent/createcontent.html",
		controller : "createContentCtrl"
	})
	.state('dashboard.editcontent', {
		url : '/content/edit/:machine_name',
		templateUrl : "/screens/content/editcontent/editcontent.html",
		controller : "editContentCtrl"
	})

	.state('dashboard.newssort', {
		url : '/newssort',
		templateUrl : "/screens/newssort/newssort.html",
		controller : "newsSortCtrl"
	})

})


app.run(function($rootScope, $state, $storage) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {

        if (!toState.install) {

            if (!toState.withoutlogin) {
            	//console.log('tttttttttttt',toState);
                var storage = $storage('radioinfo');
                if (!storage.getItem('user')) {
                    $state.go('login');
                    event.preventDefault();
                }else{
                	if(toState.url == ""){
                  		 $state.go('dashboard.home');
                  		  event.preventDefault();
                	}
                }
            } else {
                var storage = $storage('radioinfo');
                if (storage.getItem('user')) {
                    $state.go('dashboard.home');
                    event.preventDefault();
                }
            }
        }
    })

});



app.run(function($rootScope, $state, $storage) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {

                	if(toState.url == ""){
                  		 $state.go('dashboard.home');
                  		  event.preventDefault();
                	}
    })

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

		CustomDialog : function(header,html,$scope,cb){
			ngDialog.openConfirm({
				template: '<div class="panel panel-primary"> <div class="panel-heading"> <h3 class="panel-title">'+header+'</h3> </div> <div class="panel-body"><div>'+html+'</div></div> </div>',
			    plain: true,closeByEscape:true,closeByDocument:true,scope: $scope
			}).then(function(){
				console.log("----",$scope);
				cb($scope,null)
			},function(reject){
				cb(null,true)
			});		
		},


		// openConfirmDialog : function(){

		// },

	};

}])
app.factory('fields', ['Upload','RadioInfoConstant','dialogs',function(Upload,RadioInfoConstant,dialogs) {
    return {
        fieldstypes: function() {
            return [
                {label: "Text", value: 'text'}, 
                {label: "Textarea",value: 'textarea'}, 
                {label: "Long Text",value: 'longtext'}, 
            	{label: "Number", value: 'number'}, 
            	{label: "Image",value: 'image'}, 
            	{label: "file",value: 'file'}, 
                {label: "Date", value: 'date'}, 
            	{label: "List/Select",value: 'list/select'},
            	{label: "List/Checkbox",value: 'list/checkbox'},
            	{label: "List/Radio",value: 'list/radio'},
            	{label: "Boolean",value: 'boolean'},
            	{label: "Node Reference",value: 'node_reference'},
            	{label: "Term Reference",value: 'term_reference'}, 
            	{label: "User Reference",value: 'user_reference'}
            ];
        },
        typechange :function(type){
	        if (type == "list/select" || type == "list/checkbox" || type == "list/radio") {
	            return  "textarea";
	        } else if (type == "boolean") {
	            return "boolean";
	        } else if (type == "node_reference") {
	           return "select_node";
	        } else if (type == "term_reference") {
	            return "select_term";
	        }else if (type == "user_reference") {
	           return "select_users";
	        }else if (type == "date") {
               return "date";
            }else if (type == "number") {
               return "number";
            }  else {
	           return false;
	        }
        },

    };

}])

app.factory('fileupload', ['Upload','RadioInfoConstant','dialogs',function(Upload,RadioInfoConstant,dialogs) {
    return {

    	uploadfile : function(file, place,cb){
       		var serverurl = RadioInfoConstant.BASE_URL+'/upload/'+place;
	        
	        file.upload = Upload.upload({
	            url: serverurl,
	            data: {file: file},
	        });
            
            file.upload.then(function (response) {
            	var result= {};
                
            	result.url =response.data;
            	result.filename = file.name;
                return cb(result);

                dialogs.openMessageDialog('Uploaded..');
            }, function (response) {
                dialogs.openErrorDialog(response.data);
            }, function (evt) {
            });
        }

    };

}])

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
app.factory('utils', ['$http','RadioInfoConstant', function($http,RadioInfoConstant){
	return {
		create_machine_name : function(data){
			if(data == undefined){
				return "";
			}
			  var string = data.replace(/ /g,"-").toLowerCase();
		      string = string.replace(/[^a-z0-9_]/g, '');
		      return string;
		},
		timeAgo : function (date){
			   if (typeof date !== 'object') {
			        date = new Date(date);
			    }
					var datestring = "";
				    var seconds = Math.floor((new Date() - date) / 1000);
				    var interval = Math.floor(seconds / 31536000);

				    if (interval >= 1) {
				        datestring += " "+ interval + " years";
				        seconds = seconds % 31536000;
				    }

				    interval = Math.floor(seconds / 2592000);
				    if (interval >= 1) {
				    	datestring += " "+ interval + " months";
				        seconds = seconds % 2592000;
				    }

				    interval = Math.floor(seconds / 86400);
				    if (interval >= 1) {
				        datestring += " "+ interval + " days";
				        seconds = seconds % 86400;
				    }
				    interval = Math.floor(seconds / 3600);
				    if (interval >= 1) {
				        datestring += " "+ interval + " hours";
				        seconds = seconds % 3600;
				    }
				    interval = Math.floor(seconds / 60);
				    if (interval >= 1) {
				        datestring += " "+ interval + " minutes";
				        seconds = seconds % 60;
				    }
				    if(datestring == ""){
				    	datestring = 'now';
				    }else {
				    	datestring += ' ago'; 
				    }
				    return datestring;

		},
		stringtodate : function(string){
				var date = new Date(string); 
				var d = date.getDate();
				var m =  date.getMonth() + 1;
				var y = date.getFullYear();
				var hour = date.getHours();
				var mm = date.getMinutes();
				var newdate = d+" "+m+" "+y+" "+hour+":"+mm;
				return newdate;
	}

	}
}])
app.controller('contentAddCtrl',['$scope','servercalls','$state','dialogs','$rootScope', function($scope,servercalls,$state,dialogs,$rootScope){
  $rootScope.pagetitle = "Add Contents";
  $rootScope.menuname = "contentadd";
  $rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.contentadd'>Contents</a></li>";

	servercalls.get('/api/contenttype/all',{},function(err,result){
		if(err){dialogs.openErrorDialog(err);}
		else{
			$scope.contenttypes = result;
		}
	})

}]);
app.controller('createContentCtrl',['$scope','servercalls','$state','dialogs','$rootScope','RadioInfoConstant','fileupload','utils', function($scope,servercalls,$state,dialogs,$rootScope,RadioInfoConstant,fileupload,utils){
  $rootScope.menuname = "contentadd";
  $rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.content'>Contents</a></li>";
  $scope.allContents = {};


  //get content type
	servercalls.get('/api/contenttype/'+$state.params.ct_machine_name,{},function(err,result){
		if(err){dialogs.openErrorDialog(err);}
		else{
      $rootScope.pagetitle = "Create "+result.label;
      $scope.contenttypes = result;
      $scope.publish = result.publish;
      $scope.comments = result.comments;
			console.log("----------",result);
    }
	})
  $scope.base_url = RadioInfoConstant.BASE_URL;

//decalir require variables
  $scope.temp_data = {};
  $scope.content = {};
  $scope.temp_data.files = {};
  $scope.temp_data.required = {};
  $scope.temp_data.autocompletenodejson = [];
  $scope.temp_data.references ={};

  //switch editor type
  $scope.seteditor = function(editorname,type){
    $scope.content[editorname]['type'] = type;
  }

  //upload image or file
	$scope.uploadfile = function(name,place){
    fileupload.uploadfile($scope.temp_data.files[name],place,function(result){
        $scope.content[name] = result;
    });
	}
  
  //for setting select list first element
  $scope.getkeys = function(obj){
    var arr = Object.keys(obj) ;
    return arr[0].toString();
  }
  
  //For select/checkbox required work 
  $scope.checkrequired = function(required, field,field_name){
      var string = JSON.stringify(field);
      if(string.indexOf('true') > -1){
        $scope.temp_data.required[field_name] = true;
      }else{
        $scope.temp_data.required[field_name] = false;
      }
  }

 //for node reference
    $scope.searchNodeReference = function(field,word,focus){
      var Query = {}
      Query.filter ={};Query.fields ={};
      Query.fields.title=1;
      Query.fields.machine_name=1;
      Query.filter.contenttype = field.reference_type._id;
      Query.searchtitle = word;
      servercalls.get('/api/content/all',Query,function(err,result){
        if(err){alert(err);return}
        else{
          $('#'+focus+' input').focus();
          console.log(result);
          $scope.temp_data.autocompletenodejson = result;
        }
      })
    }

//for term and user references
$scope.returnreference = function(query,field , type){

  if(type == 'term'){
      if( $scope.temp_data.references[field.machine_name]){
        return $scope.temp_data.references[field.machine_name];
      }else{
          servercalls.get('/api/taxonomy/'+field.reference_type.machine_name, {}, function(err, result) {
            if(err){dialogs.openErrorDialog(JSON.stringify(err)); return;}
            else{$scope.temp_data.references[field.machine_name] = result.terms;}
          });       
        return [];
      }
  }else if (type == 'user') {
      if ($scope.temp_data.references[field.machine_name]) {
        return $scope.filter($scope.temp_data.references[field.machine_name],'username',query)
      } else {
          servercalls.get('/api/users/all/forautocomplete', {}, function(err, result) {
              if (err) { dialogs.openErrorDialog(JSON.stringify(err)); return; } 
              else {$scope.temp_data.references[field.machine_name] = result;}
          });
          return [];
      }
  }
}

  //filetration for machine Name 
  $scope.filter = function (collection, key, regex) {
      var regex = new RegExp(regex, 'g');
      return _.filter(collection, function(obj){ return obj[key].match(regex);});
  };

  //string to date
  $scope.stringToDate = function(date){
    return new Date(date);
  }

	$scope.createcontent = function(){
    if($scope.createcontentform.$valid ){
      $scope.contentObj = {};
      $scope.contentObj.publish = $scope.publish;
      $scope.contentObj.contenttype = $scope.contenttypes._id;
      $scope.contentObj.contenttype_machine_name = $scope.contenttypes.machine_name;
      $scope.contentObj.comments = $scope.comments;
      $scope.contentObj.title = $scope.contenttitle;
      $scope.contentObj.machine_name  = utils.create_machine_name($scope.contenttitle);
      $scope.contentObj.fields = $scope.content;
      console.log("content before change",$scope.content);
      console.log('need to save ..',$scope.contentObj);      
      servercalls.post('/api/content/create',$scope.contentObj,function(err,result){
         if(err){dialogs.openErrorDialog(err);return;}
         else{
            dialogs.openMessageDialog('Content Created');
            $state.go('dashboard.content');
         }
       })
    }
    else{
      console.log('see errr',$scope.createcontentform);
      dialogs.openErrorDialog('Validation Error');
    }
	}
  // Get all contents 


  $scope.getAllContents = function(content_type){
     //$scope.allContents = {};
    console.log("type",content_type);
    var config = {
      filter : {
        'contenttype_machine_name' : content_type
      }
    }
    servercalls.get('/api/content/all', config, function(err, result){
      if(err){
        console.log(err);
      }else{
        console.log("all conentes ", result);
        $scope.allContents[content_type] = result;
        $scope.content[content_type] = result[0];
       // return result;
      }
    })
  }
  // $scope.getAllContents('advertisement');

}]);
app.controller('editContentCtrl',['$scope','servercalls','$state','dialogs','$rootScope','RadioInfoConstant','fileupload','utils', function($scope,servercalls,$state,dialogs,$rootScope,RadioInfoConstant,fileupload,utils){
  $rootScope.menuname = "contentadd";
  $rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.content'>Contents</a></li>";
  $scope.allContents = {};
 
  //get content and set it accordingly
   servercalls.get('/api/content/' + $state.params.machine_name, {}, function(err, result) {
      if (err) {dialogs.openErrorDialog(err); return;}
      else {
          $rootScope.pagetitle = "Edit "+result.contenttype.label;
          $scope.contenttypes = result.contenttype;
          $scope.contenttitle = result.title;
          $scope.publish = result.publish;
          $scope.comments = result.comments;
          $scope.content = result.fields;
          $scope.orignal_content = angular.copy(result);
          console.log("edit content result",result);

      }
  })


//decalir require variables
  $scope.temp_data = {};
  $scope.temp_data.files = {};
  $scope.temp_data.required = {};
  $scope.temp_data.autocompletenodejson = [];
  $scope.temp_data.references ={};

  //switch editor type
  $scope.seteditor = function(editorname,type){
    $scope.content[editorname]['type'] = type;
  }

  //upload image or file
  $scope.uploadfile = function(name,place){
    fileupload.uploadfile($scope.temp_data.files[name],place,function(result){
        $scope.content[name] = result;
    });
  }
  
  //for setting select list first element
  $scope.getkeys = function(obj){
    var arr = Object.keys(obj) ;
    return arr[0].toString();
  }
  
  //For select/checkbox required work 
  $scope.checkrequired = function(required, field,field_name){
      var string = JSON.stringify(field);
      if(string.indexOf('true') > -1){
        $scope.temp_data.required[field_name] = true;
      }else{
        $scope.temp_data.required[field_name] = false;
      }
  }

 //for node reference
    $scope.searchNodeReference = function(field,word,focus){
      var Query = {}
      Query.filter ={};Query.fields ={};
      Query.fields.title=1;
      Query.fields.machine_name=1;
      Query.filter.contenttype = field.reference_type._id;
      Query.searchtitle = word;
      servercalls.get('/api/content/all',Query,function(err,result){
        if(err){alert(err);return}
        else{
          $('#'+focus+' input').focus();
          console.log(result);
          $scope.temp_data.autocompletenodejson = result;
        }
      })
    }

//for term and user references
$scope.returnreference = function(query,field , type){

  if(type == 'term'){
      if( $scope.temp_data.references[field.machine_name]){
        return $scope.temp_data.references[field.machine_name];
      }else{
          servercalls.get('/api/taxonomy/'+field.reference_type.machine_name, {}, function(err, result) {
            if(err){dialogs.openErrorDialog(JSON.stringify(err)); return;}
            else{$scope.temp_data.references[field.machine_name] = result.terms;}
          });       
        return [];
      }
  }else if (type == 'user') {
      if ($scope.temp_data.references[field.machine_name]) {
        return $scope.filter($scope.temp_data.references[field.machine_name],'username',query)
      } else {
          servercalls.get('/api/users/all/forautocomplete', {}, function(err, result) {
              if (err) { dialogs.openErrorDialog(JSON.stringify(err)); return; } 
              else {$scope.temp_data.references[field.machine_name] = result;}
          });
          return [];
      }
  }
}

  //filetration for machine Name 
  $scope.filter = function (collection, key, regex) {
      var regex = new RegExp(regex, 'g');
      return _.filter(collection, function(obj){ return obj[key].match(regex);});
  };
  
  //string to date
  $scope.stringToDate = function(date){
    return new Date(date);
  }


  $scope.updatecontent = function(){
    if($scope.updatecontentform.$valid ){
      $scope.contentObj = {};
      $scope.contentObj.publish = $scope.publish;
      $scope.contentObj.contenttype = $scope.contenttypes._id;
      $scope.contentObj.contenttype_machine_name = $scope.contenttypes.machine_name;
      $scope.contentObj.comments = $scope.comments;
      $scope.contentObj.title = $scope.contenttitle;
      $scope.contentObj.fields = $scope.content;
      console.log("content before change",$scope.content);
      console.log('need to save ..',$scope.contentObj);   

       servercalls.put('/api/content/' + $state.params.machine_name , $scope.contentObj, function(err, result) {
          if(err){dialogs.openErrorDialog(err);return;}
          else{
            dialogs.openMessageDialog('Content Updated');
            $state.go('dashboard.content');
          }
        })
    }else{
      console.log('see errr',$scope.createcontentform);
      dialogs.openErrorDialog('Form Validation Error');
    }
  }

  $scope.getAllContents = function(content_type){
     //$scope.allContents = {};
    console.log("type in editcontent",content_type);
    var config = {
      filter : {
        'contenttype_machine_name' : content_type
      }
    }
    servercalls.get('/api/content/all', config, function(err, result){
      if(err){
        console.log(err);
      }else{
        console.log("all conentes ", result);
        $scope.allContents[content_type] = result;
        //$scope.content[content_type] = result[0];
       // return result;
      }
    })
  }

}]);
app.controller('ContentTypesFieldsCtrl', ['$scope','servercalls','$state','dialogs','$rootScope', function($scope,servercalls,$state,dialogs,$rootScope){

  $rootScope.menuname = "contenttypes";
  $rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.contenttypes'>Content Type</a></li>";

	$scope.contenttypefieldsGrid= {};
	$scope.contenttypefieldsGrid.columnDefs = [
		{displayName : "Name" , field : "label"},
		{displayName : "Machine Name" , field : "machine_name"},
		{displayName : "Type" , field : "type.label"},
		{displayName : "Operations" , field : "operations", cellTemplate: '<button ng-click="grid.appScope.editfield(row.entity)" class="btn btn-xs btn-primary table_btns">Edit</button><button class="btn btn-xs btn-primary table_btns" ng-click="grid.appScope.deletefield(row.entity,rowRenderIndex)">Delete</button>',enableSorting: false },
	];
	servercalls.get('/api/contenttype/'+$state.params.ct_machine_name,{},function(err,result){
		//for setting name in page title
		$rootScope.pagetitle =result.label;
		$scope.contenttypefieldsGrid.data = result.fields;
	})
	$scope.movecreatefield =function(){
		$state.go('dashboard.fields_create',{ct_machine_name : $state.params.ct_machine_name});
	}

	$scope.editfield = function(row){
		$state.go('dashboard.fields_edit',{ct_machine_name : $state.params.ct_machine_name , machine_name : row.machine_name});
	}
	//delete content type
	$scope.deletefield = function(row,index){
		dialogs.openConfirmDialog('Are you sure to delete <b>'+row.label+'</b>','',function(yes,no){
			if(yes){
				servercalls.delete('/api/contenttype/'+$state.params.ct_machine_name+"/field/" +row.machine_name ,function(err,result){
					if(err){	
						dialogs.openErrorDialog(err);
						console.log(err);
					}else{
						$scope.contenttypefieldsGrid.data.splice(index,1);
					}
				});
			}
		});
	}

}])
app.controller('groupsCtrl', ['$scope','servercalls','dialogs','$state','$rootScope','utils', function($scope, servercalls,dialogs,$state,$rootScope, utils){
	$rootScope.pagetitle = "Menus Groups";
	$rootScope.menuname = "menus";
	$rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.groups'>Menus</a></li>";

	//column details
	$scope.groupsGrid = {
		columnDefs : [
		{displayName : "Group name", field : "group_name"},
		{displayName : "Machine Name", field : "machine_name", enableCellEdit: false},
		{displayName : "Operations" , field : "operations",enableCellEdit: false , cellTemplate: '<button ng-click="grid.appScope.showmenus(row.entity)" class="btn btn-xs btn-primary table_btns">Show Menus</button><button class="btn btn-xs btn-primary table_btns" ng-click="grid.appScope.deletegroup(row.entity,rowRenderIndex)">Delete</button>',enableSorting: false },
		]
	}

	//get all roles that exist
	servercalls.get('/api/menus/all', {}, function(err, result){
		if(err){$scope.error = err; return;
		}else{
			$scope.groupsGrid.data = result;
		}
	})
	//show add form
	$scope.toggle = function(){
		$scope.addgroup = !$scope.addgroup;
		$scope.error = '';
	}

	$scope.showmenus =function(row){
		$state.go("dashboard.groups_menus",{'machine_name' : row.machine_name});
	}

	//on edit of row
	$scope.groupsGrid.onRegisterApi = function(gridApi) {
	    $scope.gridApi = gridApi;
	    gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
	        if (newValue !== oldValue) {
	            servercalls.put('/api/menus/group/' + rowEntity.machine_name+"/"+rowEntity.group_name, {}, function(err, result) {
	                if (err) {
	                	if(err == 'Permission Denied'){
		 					dialogs.openErrorDialog(err);return
		 				}
	                    console.log(err);
	                }
	            });
	        }
	    });
	};


	$scope.add = function(){		
		if($scope.group.label != undefined && $scope.group.label != ''){
			var string = utils.create_machine_name($scope.group.label);
			servercalls.post('/api/menus/group/'+string+"/"+$scope.group.label,{},function(err, doc){
				if(err){
	                if(err == 'Permission Denied'){
	 					dialogs.openErrorDialog(err);return
	 				}
					console.log("err",err);return;
				}else{
					$scope.groupsGrid.data.push(doc);
					$scope.addgroup = !$scope.addgroup;
					$scope.group.label = '';
				}
			})
		}else{
			$scope.error = "Please type Group name";
		}
	}

	$scope.deletegroup =  function(row, index){
	  dialogs.openConfirmDialog('Delete Menu<b> '+row.group_name+'</b>','', function(yes,no){
      if(no){
        console.log("dialogs CustomDialog");
        return;
      }else{
      	servercalls.delete('/api/menus/group/'+row.machine_name, function(err,doc){
		 	if(err){
                if(err == 'Permission Denied'){
 					dialogs.openErrorDialog(err);return
 				}
		 		console.log(err);return;}
		 	else{
		 		$scope.groupsGrid.data.splice(index,1);
		 	}			 	
		 })
	      }
	    })		
	};


}]);
app.controller('groupMenusCtrl', ['$scope','servercalls','dialogs','$state','$rootScope','$TreeDnDConvert', function($scope, servercalls,dialogs,$state,$rootScope){
  $rootScope.pagetitle = "Menus Groups";
  $rootScope.menuname = "menus";
  $rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.groups'>Menus</a></li>";


  $scope.group_name = $state.params.machine_name;
  
  $scope.temp = '<form ng-submit="confirm()"> <div class="form-group"> <label>Enter Menu Name</label> <input class="form-control" ng-model="newmenu.name"> </div> <div class="form-group"> <label>Link</label> <input class="form-control" ng-model="newmenu.link"> </div> <div class="form-group"> <div class="checkbox"> <label ng-init="newmenu.enabled=\'true\'"> <input type="checkbox" ng-true-value="true" ng-false-value="false" ng-model="newmenu.enabled">Enabled </label> </div> </div> <button type="submit" class="table_btns btn btn-sm btn-default">Create Menu</button> <button ng-click="closeThisDialog(0)" class="btn btn-sm btn-default table_btns">Cancel</button> </form>';

  var tree;
  $scope.tree_data = {};
  $scope.my_tree = tree = {};
  
  //definition for field 
  $scope.expanding_property = {field:"name",displayName: 'Name'};
  $scope.col_defs =[
    {field : "enabled",displayName:  'Enabled',},
    {displayName:  'Options',cellTemplate: '<button ng-click="addchild(node)" class="btn btn-sm btn-primary table_btns">Add Child</button><button ng-click="editNode(node)" class="btn btn-sm btn-primary table_btns">Edit Menu</button><button ng-click="delete(node)" class="btn btn-sm btn-primary table_btns"> Delete</button>',}
  ]


    servercalls.get('/api/menus/group/'+$state.params.machine_name,{},function(err,result){
      if(err){
            if(err == 'Permission Denied'){
              dialogs.openErrorDialog(err);return
            }
            $scope.error = err; console.log(err); return;}
      else{
        $scope.tree_data = result.menus;
         $scope.datacopy = angular.copy(result.menus);
      }
    })


  $scope.saveChanges = function(){
    servercalls.post('/api/menus/'+$state.params.machine_name, {menus : $scope.tree_data},function(err,result){
        if(err){
            if(err == 'Permission Denied'){
              dialogs.openErrorDialog(err);return
            }
          $scope.error = err; console.log(err); return;}
        else{
            $scope.datacopy = result;
        }
    })
  } 

  //create menus of root level
  $scope.createRootMenu =function(){
    $scope.newmenu ={};
    dialogs.CustomDialog('Create Menu',$scope.temp,$scope, function(yes,no){
      if(no){
        console.log("dialogs CustomDialog");
      }else{
        yes.newmenu.__children__ = [];
        tree.add_node_root($scope.newmenu);
        yes.saveChanges();
      }
    })
  
  }

  //add child to any menu
  $scope.addchild =function(node){
      $scope.newmenu ={};
       dialogs.CustomDialog('Create SubMenu',$scope.temp,$scope, function(yes,no){
      if(no){
        console.log("dialogs CustomDialog");
      }else{
        yes.newmenu.__children__ = [];
        tree.add_node(node,$scope.newmenu,0);
        yes.saveChanges();
      }
    }) 
  }
  
  //delete any node
  $scope.delete = function(node){
       dialogs.openConfirmDialog('Delete Menu<b> '+node.name+'</b>','', function(yes,no){
      if(no){
        console.log("dialogs CustomDialog");
      }else{
        tree.remove_node(node);
       $scope.saveChanges();
      }
    })    
  }

  //edit any node
  $scope.editNode = function(node){
      $scope.newmenu = node;
       dialogs.CustomDialog('Create SubMenu',$scope.temp.replace('Create Menu','Update Menu'),$scope, function(yes,no){
      if(no){
        $scope.tree_data = angular.copy($scope.datacopy);
      }else{
        yes.saveChanges();
      }
    })    
  }

  $scope.expandall = function(){
    tree.expand_all()
  }
  $scope.collapseall = function(){
    tree.collapse_all()
  }
}]);
app.controller('usersCreateCtrl', ['$scope','servercalls','dialogs','$state','$rootScope', function($scope, servercalls,dialogs,$state,$rootScope){
  $rootScope.pagetitle = "Create User";
  $rootScope.menuname = "users";
  $rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.users'>Users</a></li>";

	$scope.user={};
	$scope.user.status = "true";
	$scope.user.roles = new Array();

	//get all roles
	servercalls.get('/api/roles/all', {filter :{machine_name:{$ne : 'anonymous_user'}}}, function(err, result){
		if(err){dialogs.openErrorDialog(err);return}
		else{
			$scope.roles =result;
		}
	})

	//change on checkbox of roles
	$scope.checkboxclick = function(id){
		var position  = $scope.user.roles.indexOf(id);
		if(position > -1){
			$scope.user.roles.splice(position,1);
		}else{
			$scope.user.roles.push(id);
		}

	}

	$scope.register = function(){
		if($scope.user.local.password == $scope.user.local.confirmPassword){		
			servercalls.post('/api/users/create',$scope.user,function(err,result){
	            if (err) { 
	 				if(err == 'Permission Denied'){dialogs.openErrorDialog(err);return;}
	            	err.ermessage ? $scope.error = err.ermessag : "";return;}
	            else {
					dialogs.openMessageDialog('User Created Successfully');
					$state.go('dashboard.users');
				}
			})
		}else{
			$scope.error = 'Password doesn\'t match ';
		}
	}
}]);
app.controller('usersEditCtrl', ['$scope','servercalls','$state','$rootScope','$storage','dialogs', function($scope, servercalls,$state,$rootScope,$storage,dialogs){
  $rootScope.pagetitle = "Edit User";
  $rootScope.menuname = "users";
  $rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.users'>Users</a></li>";

	
	var storage = $storage('radioinfo');
//get all roles
	servercalls.get('/api/roles/all', {filter :{machine_name:{$ne : 'anonymous_user'}}}, function(err, result){
		if(err){$scope.error = err;console.log(err);return;
		}else{
			$scope.roles =result;
		}
	})

//get user for edit
	servercalls.get('/api/users/'+$state.params.uid,{},function(err,result){
		if(err){dialogs.openErrorDialog(err);return}
		else{
			result.status = String(result.status);
			$scope.user = result;
		}
	})

//change on checkbox of roles
	$scope.checkboxclick = function(id){
		if($scope.user.roles){
			console.log('in ???');
			var position  = $scope.user.roles.indexOf(id);
			if(position > -1){
				$scope.user.roles.splice(position,1);
			}else{
				$scope.user.roles.push(id);
			}
		}
	}

	$scope.UpdateUser = function() {

		$scope.error = null;
	    if ($scope.user.local.password != undefined || $scope.user.local.confirmPassword != undefined) {
	         if ($scope.user.local.password != $scope.user.local.confirmPassword) {
	        	    $scope.error = ['Password doesn\'t match '];
	        }
	    } 
	        if (!$scope.error){
	        servercalls.put('/api/users/' + $state.params.uid, $scope.user, function(err, result) {
	            if (err) { 
	 				if(err == 'Permission Denied'){
	 					dialogs.openErrorDialog(err);return
	 				}
	            	err.ermessage ? $scope.error = err.ermessag : "";return;}
	            else {
	            	if(result._id == $rootScope.loggedInUser._id){
		            	$rootScope.loggedInUser = result;
		            	storage.setItem('user', result);
	            	}
					dialogs.openMessageDialog('User Updated Successfully');
	                $state.go('dashboard.users');
	            }
	        })
	    }
	   
	}



}]);
app.controller('EditFieldCtrl', ['$scope','servercalls','$state','$rootScope','dialogs','fields','fileupload','utils', function($scope,servercalls,$state,$rootScope,dialogs,fields,fileupload,utils){

  $rootScope.pagetitle = "Contenttypes";
  $rootScope.menuname = "contenttypes";
  $rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.contenttypes'>Content Type</a></li>";

  //get type for fields
  $scope.types = fields.fieldstypes();

  //set type of field to text by default
  $scope.field = {};
  $scope.field.type = $scope.types[0];

  //create select list for reference fields limit and set it to 1
  $scope.limitfield = [1,2,3,4,5];
  $scope.field.ref_limit = $scope.limitfield[0]; 
  //it get fields setting like  list and other
  $scope.allowed_values = {};
  //on change of textarea , parse json and add in it 
  $scope.parsedjson ={};
  $scope.references={};

    // get all content types for showing during Node reference
    servercalls.get('/api/contenttype/all',{filter:{machine_name : {$ne : $state.params.ct_machine_name}},fields:{label : 1 , machine_name : 1}},function(err,result){
        if(err){alert(err);return }
        else{
            $scope.ref_node = result;
            $scope.allowed_values.node_reference = $scope.ref_node[0];
        }
    })

    // get all taxonomy for showing during term reference
    servercalls.get('/api/taxonomy/all',{fields : {terms : 0}},function(err,result){
        if(err){alert(err);return; }
        else{
            $scope.ref_term = result;
              $scope.allowed_values.term_reference = $scope.ref_term[0];
        }
    })

    //get data of current fields
    servercalls.get('/api/contenttype/'+$state.params.ct_machine_name+ "/field/"+$state.params.machine_name,{},function(err,result){
        if(err){ dialogs.openErrorDialog(err);return;}
        $scope.field = result.fields[0];
        console.log("------data-------",result);
        $scope.typechange();


        if($scope.field.type.value == 'node_reference' ||$scope.field.type.value == 'term_reference'){
           $scope.allowed_values[$scope.field.type.value] =  $scope.field.reference_type;
        }
    
        if(['list/select','list/checkbox','list/radio'].indexOf($scope.field.type.value) > -1){
            var val = JSON.stringify(result.fields[0].allowed_values);
            $scope.allowed_values.textbox = val.replace(/,/g,",\n");
            $scope.parsejson();
        }

        if($scope.field.type.value == 'boolean'){
            $scope.allowed_values.boolean={};
            $scope.allowed_values.boolean.on = $scope.field.allowed_values.on;
            $scope.allowed_values.boolean.off = $scope.field.allowed_values.off;
                    console.log($scope.field);
        }

    });
    //parse json for select list json
    $scope.parsejson = function(){
        try {$scope.parsedjson = $.parseJSON($scope.allowed_values.textbox);} 
        catch (e) {return;}
    }

    //on reference change set to null
    $scope.ReferenceChange = function(){
        $scope.references= {};
        $scope.field.default_value= {};
    }
    
    // Upload Files/Images
    $scope.uploadfile = function(file, place){
        fileupload.uploadfile(file,place,function(result){
            $scope.field.default_value = result;
        });
    }
    
  //string to date
  $scope.stringToDate = function(date){
    return new Date(date);
  }


    //on field type change , change other things accordingly
    $scope.typechange = function() {
        //on change set default value to null
        // $scope.field.default_value = {}
        // $scope.allowed_values.boolean = {}
        // $scope.field.default_value.value='';
        // delete $scope.field.default_value.type;

        //fields related changes
        $scope.allowed_values_view = fields.typechange($scope.field.type.value);

    }

    //set editor defaul setting for default value option if ckeditor
    $scope.seteditor = function(editor_type){
        $scope.field.default_value.type = editor_type;
    }

    //create machine name on change of label
    $scope.create_machine_name = function(label) {
        $scope.field.machine_name =  utils.create_machine_name(label);
    }
    $scope.updatefield = function() {
        if($scope.updateafield.$invalid ){
            dialogs.openErrorDialog('Validation Error');
            return;
        }

        if ($scope.field.type.value == "list/select" || $scope.field.type.value == "list/checkbox" || $scope.field.type.value == "list/radio") {
            if ($scope.allowed_values.textbox == null) {
                dialogs.openErrorDialog('Please Enter value for Lists');
                return;
            } else {
                try {
                    json = $.parseJSON($scope.allowed_values.textbox);
                } catch (e) {
                     dialogs.openErrorDialog('Enter Valid JSON');
                    return;
                }
                if (typeof json !== 'undefined') {
                    $scope.field.allowed_values = json
                }
            }

        } else if ($scope.field.type.value == "boolean") {
            if ($scope.allowed_values.boolean.on == null || $scope.allowed_values.boolean.on == ""|| $scope.allowed_values.boolean.off == "" ||$scope.allowed_values.boolean.off == null) {
               dialogs.openErrorDialog('Please Enter Values For boolean On Off');
          	 return;
            } else {
                $scope.field.allowed_values = {
                    "on": $scope.allowed_values.boolean.on,
                    "off": $scope.allowed_values.boolean.off
                }
            }
        } else if ($scope.field.type.value == "node_reference" ) {
            
            if ($scope.allowed_values.node_reference == null) {
                dialogs.openErrorDialog('Please Select Node For Reference');
            return;
            }else{
                $scope.field.reference_type = $scope.allowed_values.node_reference;
            }

        } else if ($scope.field.type.value == "term_reference" ) {
            if ($scope.allowed_values.term_reference == null) {
                  dialogs.openErrorDialog('Please Select Taxonomy For Reference');
            return;
            }else{
                 $scope.field.reference_type = $scope.allowed_values.term_reference;
            }
        } else {
	        delete $scope.field.allowed_values;
        }

        //everything goes fine go on create field
        servercalls.put('/api/contenttype/'+$state.params.ct_machine_name+'/field/'+$state.params.machine_name , $scope.field,function(err,result){
        	if(err){dialogs.openErrorDialog(err);}
            else{
        		dialogs.openMessageDialog('Field Updated');
                $state.go('dashboard.contenttypes_fields', {ct_machine_name : $state.params.ct_machine_name});
        	}
        })
    }

}])
app.controller('CreateFieldCtrl', ['$scope', 'servercalls', '$state', '$rootScope','dialogs','fields','fileupload','utils', function($scope,servercalls,$state,$rootScope,dialogs,fields,fileupload,utils) {
    //default thing for page settings
  $rootScope.pagetitle = "Contenttypes";
  $rootScope.menuname = "contenttypes";
  $rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.contenttypes'>Content Type</a></li>";

  //get type for fields
  $scope.types = fields.fieldstypes();

  //set type of field to text by default
  $scope.field = {};
  $scope.field.type = $scope.types[0];

  $scope.field.widget_type = 'auto';
  //create select list for reference fields limit and set it to 1
  $scope.limitfield = [1,2,3,4,5];
  $scope.field.ref_limit = $scope.limitfield[0]; 
  //it get fields setting like  list and other
  $scope.allowed_values = {};
  //on change of textarea , parse json and add in it 
  $scope.parsedjson ={};
  $scope.references={};

    // get all content types for showing during Node reference
    servercalls.get('/api/contenttype/all',{filter:{machine_name : {$ne : $state.params.ct_machine_name}},fields:{label : 1 , machine_name : 1}},function(err,result){
        if(err){alert(err);return }
        else{
            $scope.ref_node = result;
            $scope.allowed_values.node_reference = $scope.ref_node[0];
        }
    })

    // get all taxonomy for showing during term reference
    servercalls.get('/api/taxonomy/all',{fields : {terms : 0}},function(err,result){
        if(err){alert(err);return; }
        else{
            $scope.ref_term = result;
              $scope.allowed_values.term_reference = $scope.ref_term[0];
        }
    })

    //get current contnet type details
    servercalls.get('/api/contenttype/'+$state.params.ct_machine_name,{},function(err,result){
        if(err){dialogs.openErrorDialog(err);return }
        else{$scope.current_type_data = result;}
    })
    

    //parse json for select list json
    $scope.parsejson = function(){
        try {$scope.parsedjson = $.parseJSON($scope.allowed_values.textbox);} 
        catch (e) {return;}
    }

    //on reference change set to null
    $scope.ReferenceChange = function(){
        $scope.references= {};
        $scope.field.default_value= {};
    }
    
    // Upload Files/Images
    $scope.uploadfile = function(file, place){
        fileupload.uploadfile(file,place,function(result){
            $scope.field.default_value = result;
            console.log($scope.field);
        });
    }
    
    //on field type change , change other things accordingly
    $scope.typechange = function() {
        //on change set default value to null
        $scope.field.default_value = {}
        $scope.allowed_values.boolean = {}
        $scope.field.default_value.value='';
        delete $scope.field.default_value.type;

        //fields related changes
        $scope.allowed_values_view = fields.typechange($scope.field.type.value);

    }

    //set editor defaul setting for default value option if ckeditor
    $scope.seteditor = function(editor_type){
        $scope.field.default_value.type = editor_type;
    }

    //create machine name on change of label
    $scope.create_machine_name = function(label) {
        $scope.field.machine_name =  utils.create_machine_name(label);
    }

    $scope.createfield = function() {
        if($scope.createafield.$invalid ){
            dialogs.openErrorDialog('Validation Error');
            return;
        }

        if ($scope.field.type.value == "list/select" || $scope.field.type.value == "list/checkbox" || $scope.field.type.value == "list/radio") {
            if ($scope.allowed_values.textbox == null) {
                dialogs.openErrorDialog('Please Enter value for Lists');
                return;
            } else {
                try {
                    json = $.parseJSON($scope.allowed_values.textbox);
                } catch (e) {
                     dialogs.openErrorDialog('Enter Valid JSON');
                    return;
                }
                if (typeof json !== 'undefined') {
                    $scope.field.allowed_values = json
                }
            }

        } else if ($scope.field.type.value == "boolean") {
            if ($scope.allowed_values.boolean.on == null || $scope.allowed_values.boolean.off == null) {
               dialogs.openErrorDialog('Please Enter Values For boolean On Off');
           return;
            } else {
                $scope.field.allowed_values = {
                    "on": $scope.allowed_values.boolean.on,
                    "off": $scope.allowed_values.boolean.off
                }
            }
        } else if ($scope.field.type.value == "node_reference" ) {
            
            if ($scope.allowed_values.node_reference == null) {
                dialogs.openErrorDialog('Please Select Node For Reference');
                return;
            }else{
                $scope.field.reference_type = $scope.allowed_values.node_reference;
                //$scope.field.listType = $scope.field.listType;
            }

        } else if ($scope.field.type.value == "term_reference" ) {
            if ($scope.allowed_values.term_reference == null) {
                  dialogs.openErrorDialog('Please Select Taxonomy For Reference');
                return;
            }else{
               $scope.field.reference_type = $scope.allowed_values.term_reference;
            }
        } else {
	        delete $scope.field.allowed_values;
        }
        //everything goes fine go on create field
       var obj =  _.findWhere($scope.current_type_data.fields,{machine_name :$scope.field.machine_name})
       console.log('1111',$scope.field);
        if(obj){
            dialogs.openErrorDialog('Field exist with same Machine Name');
        }else{
            servercalls.post('/api/contenttype/'+$state.params.ct_machine_name+'/field/'+$scope.field.machine_name , $scope.field,function(err,result){
             if(err){
                dialogs.openErrorDialog(err);
             }else{
                dialogs.openMessageDialog('Field Created');

                $scope.field.label = "";
                $scope.field.machine_name = "";
                $scope.current_type_data = result;
                $scope.field.type = $scope.types[0];
                $scope.filename = '';
                $scope.filefullurl  ='';
                $scope.field.required = null; 
                $scope.field.widget_type = 'auto';
                $scope.typechange();
             
             }
            })
        }

    }
}])

app.controller('contentCtrl',['$scope','servercalls','$state','dialogs','$rootScope','$storage', function($scope,servercalls,$state,dialogs,$rootScope,$storage){
  $rootScope.pagetitle = "Contents";
  $rootScope.menuname = "content";
  $rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.content'>Contents</a></li>";
  
  var storage = $storage('radioinfo');

	//default config for pagination work
	$scope.count = 0;
	$scope.currentpage =1 ;
	$scope.limit =10;

	//get fields for showing
	$scope.config = {
		'skip' : 0,
		'limit' : $scope.limit,
		 'sort': {created_on : -1}
 	};

	if(storage.getItem('contents')){
		$scope.config.filter = {contenttype_machine_name : storage.getItem('contents').machine_name};
		$scope.type = storage.getItem('contents');
	}
	
	//column details
	$scope.contentGrid = {
		columnDefs : [
		{displayName : "Title", field : "title"},
		{displayName : "type", field : "contenttype.label"},
		{displayName : "Author", field : "creator.local.username"},
		{displayName : "Operations" , field : "operations", cellTemplate: '<button ng-click="grid.appScope.editcontent(row.entity)" class="btn btn-xs btn-primary table_btns">Edit</button><button class="btn btn-xs btn-primary table_btns" ng-click="grid.appScope.deletecontent(row.entity,rowRenderIndex)">Delete</button>',enableSorting: false },
		]
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
				$scope.contentGrid.data = result;
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

	//edit and delete contents
	$scope.editcontent = function(row){
		$state.go("dashboard.editcontent",{machine_name : row.machine_name});
	}
	$scope.deletecontent = function(row,index){
	  dialogs.openConfirmDialog('Delete Menu<b> '+row.title+'</b>','', function(yes,no){
   	   if(yes){
         	servercalls.delete('/api/content/'+row.machine_name, function(err, result){
			 	if(err){
	 				if(err == 'Permission Denied'){
	 					dialogs.openErrorDialog(err);return
	 				}
			 		console.log(err);return;}
				else{
					$scope.contentGrid.data.splice(index,1);
				}
			})
    	  }
    	});
	 }

	 //filteration work
	//get all content types
	servercalls.get('/api/contenttype/all',{},function(err,result){
		if(err){dialogs.openErrorDialog(JSON.stringify(err));
		}else{
			$scope.content_types = result;		
		}
	})
	$scope.searchcontent = function(){
		if($scope.type.machine_name){
			storage.setItem('contents', $scope.type);
			$scope.config.filter = {contenttype_machine_name : $scope.type.machine_name};
			get_contents();
		}
	}
	$scope.filterDisable = function(){
		delete $scope.config.filter ;
		storage.removeItem('contents');
		$scope.type = "";
		get_contents();
	} 
}]);
app.controller('ContentTypesCtrl',['$scope','servercalls','$state','dialogs','$rootScope','utils', function($scope,servercalls,$state,dialogs,$rootScope,utils){
  $rootScope.pagetitle = "Contenttypes";
  $rootScope.menuname = "contenttypes";
  $rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.contenttypes'>Content Type</a></li>";

	$scope.contenttypeGrid= {};
	$scope.contenttypeGrid.columnDefs = [
		{displayName : "Name" , field : "label"},
		{displayName : "Machine Name" , field : "machine_name", enableCellEdit: false},
		{displayName : "Operations" , field : "operations",enableCellEdit: false , cellTemplate: '<button class="btn btn-xs btn-primary table_btns" ng-click="grid.appScope.editcontenttype(row.entity,rowRenderIndex)">Edit</button> <button ng-click="grid.appScope.MangaeFields(row.entity)" class="btn btn-xs btn-primary table_btns">Manage Fields</button><button class="btn btn-xs btn-primary table_btns" ng-click="grid.appScope.deletecontenttype(row.entity,rowRenderIndex)">Delete</button>',enableSorting: false },
	];

	//set for default 
	$scope.contenttype ={};
	$scope.contenttype.publish =true;
	$scope.contenttype.comments = true;
 	$scope.temp_form = '<form ng-submit="confirm()"> <div class="form-group"> <label>Enter Content Type </label> <input class="form-control" ng-model="contenttype.label"> </div> <div class="form-group"> <div class="checkbox"> <label > <input type="checkbox" ng-model="contenttype.comments">Comment</label> </div> </div> <div class="form-group"> <div class="checkbox"> <label> <input type="checkbox" ng-model="contenttype.publish">Publish </label> </div> </div> <button type="submit" class="table_btns btn btn-sm btn-default">Create Content Type</button> <button ng-click="closeThisDialog(0)" class="btn btn-sm btn-default table_btns">Cancel</button> </form>';

	//on editing of row
    $scope.contenttypeGrid.onRegisterApi = function(gridApi) {
	    //set gridApi on scope
	    $scope.gridApi = gridApi;
	    gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
	        if (newValue !== oldValue) {
	            servercalls.put('/api/contenttype/' + rowEntity.machine_name, rowEntity, function(err, result) {
	                if (err) {
						dialogs.openErrorDialog(err);
	                }
	            });
	        }
	    });
	};

 
	//get all contents 
	servercalls.get('/api/contenttype/all',{},function(err,result){
			if(err){dialogs.openErrorDialog(err);return;}
			else{$scope.contenttypeGrid.data = result;	}
	})


	$scope.createtypeform = function(){
		dialogs.CustomDialog('Create Content Type',$scope.temp_form,$scope, function(yes,no){
		  	if(yes){
		  		var string = utils.create_machine_name($scope.contenttype.label);
		  		servercalls.post('/api/contenttype/'+string , $scope.contenttype,function(err,result){
					if(err){dialogs.openErrorDialog(err);return;}
					else{
						$scope.contenttypeGrid.data.push(result);

						//reset setting to default
						$scope.contenttype ={};
						$scope.contenttype.publish =true;
						$scope.contenttype.comments = true;
					}
				})
		  	}
		});
	}

	$scope.editcontenttype = function(row,index){
		var orignal_content_type  = angular.copy(row);
		$scope.contenttype = row;
		dialogs.CustomDialog('Edit Content Type', $scope.temp_form.replace('Create Content Type','Update Content Type'),$scope, function(yes,no){
		  	if(yes){
		  		 servercalls.put('/api/contenttype/' + row.machine_name, $scope.contenttype, function(err, result) {
	                if (err) {dialogs.openErrorDialog(err);return;}
	                else{
	                	$scope.contenttypeGrid.data[index] = $scope.contenttype;
	                }
	            });
		  	}else{
		  		$scope.contenttypeGrid.data[index] = orignal_content_type;
		  	}
		});
	}

	//manage fields
	$scope.MangaeFields = function(row){
		$state.go('dashboard.contenttypes_fields',{ct_machine_name : row.machine_name});
	}
	//delete content type
	$scope.deletecontenttype = function(row,index){
		dialogs.openConfirmDialog('Are you sure to delete <b>'+row.label+'</b>','',function(yes,no){
			if(yes){
				servercalls.delete('/api/contenttype/'+row.machine_name ,function(err,result){
					if(err){
						dialogs.openErrorDialog(err);
					}else{
						$scope.contenttypeGrid.data.splice(index,1);
					}
				});
			}
		});
	}

}]);


app.controller('dashboardCtrl', ['$scope','servercalls','$state','$rootScope','$storage','$compile', function($scope, servercalls,$state,$rootScope,$storage,$compile){
$rootScope.base_path = 'https//localhost:3000'; 
var storage = $storage('radioinfo');
servercalls.get('/api/users/islogin',{},function(err,result){
	console.log("users in dashboardCtrl",result);
	if(err){
		storage.removeItem('user')
	}else{
		storage.setItem('user', result);
		$rootScope.loggedInUser = result;	

	}
})
$scope.logout = function(){
	servercalls.get('/api/users/logout',{},function(err,result){
		if(err){console.log(err);return;}
		else{
			$rootScope.loggedInUser = null;		
			storage.removeItem('user');
			$state.go('login');
		}
	})	

}


}]);
app.controller('HomeCtrl', ['$scope','servercalls','dialogs','$state','$rootScope', function($scope, servercalls,dialogs,$state,$rootScope){
	$rootScope.pagetitle = "Dashboard";
	$rootScope.menuname = "dashboard";
	$rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li>";

	$scope.contents = 0;
	$scope.users = 0;
	servercalls.get('/api/content/all/count',{},function(err,result){
		if(err){dialogs.openErrorDialog(JSON.stringify(err));return ;}
		$scope.contents = result;
	});

	servercalls.get('/api/users/all/count',{},function(err,result){
		if(err){dialogs.openErrorDialog(JSON.stringify(err));return ;}
		$scope.users = result;
	});

	
}]);
app.controller('installCtrl', ['$scope','servercalls','dialogs','$state', function($scope, servercalls,dialogs,$state){
	$scope.user = {};
	servercalls.post('/api/install/is_on',{},function(err,result){
		if(err){
			dialogs.openErrorDialog("Permission Denied");
		}else{
			$scope.haspermission = true;
		}
	});
	
$scope.installation = function(){
	if($scope.user.local.password == $scope.user.local.confirm){
		dialogs.openConfirmDialog('Are you sure for Installation','Please confirm that you want a new installtion of data and do not care if old data exist and get deleted.....',function(yes,no){
			if(yes){
				delete $scope.user.local.confirm;
				servercalls.post('/api/install',$scope.user,function(err,result){
					if(err){
						dialogs.openErrorDialog("You can not install till you change setting in db file");
					}else{
						dialogs.openMessageDialog('Installation Done <br> Please change db setting for stop installation again');
						$state.go('login');
					}
				});
			}
		})
	}else{
		$scope.error = "Passwords not match";
	}
}

}]);
app.controller('loginCtrl', ['$scope','$state','$rootScope','$storage','servercalls', function($scope,$state,$rootScope,$storage,servercalls){
	$scope.user = {};
	$scope.error='';

	$scope.login = function(){
		servercalls.post('/api/users/login',$scope.user,function(err,result){
			console.log("on login user result",result);
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
				$rootScope.loggedInUser = result;
				$state.go('dashboard');
			}
		})
	}
}])
app.controller('newsSortCtrl', ['$scope','$state','$rootScope','$storage','servercalls','dialogs', function($scope,$state,$rootScope,$storage,servercalls,dialogs){
  $rootScope.pagetitle = "News Sorting Page";
  $rootScope.menuname = "dashboard";
  $rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.newssort'>News Sort</a></li>";


  //config settings	
  $scope.config = {};
  $scope.config.limit = 5;
  $scope.config.fields = {title : 1};
  //home_slider , home_list
  
  $scope.select_type = 'home_slider';

	//column details
	$scope.newsGrid = {
		columnDefs : [{displayName : "Title", field : "title",enableSorting: false}],
	    rowTemplate: '<div grid="grid" class="ui-grid-draggable-row" draggable="true"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader, \'custom\': true }" ui-grid-cell></div></div>'
	}

	$scope.typechange = function(){
		if($scope.select_type == 'hot_news'){
			$scope.config.filter = {"fields.show_on_homepage" : 'true',contenttype_machine_name :'hot_news'};
			$scope.get_contents();
		}else{
			$scope.config.filter = {"fields.display_in" : $scope.select_type ,contenttype_machine_name :'news' }
			$scope.get_contents();
		}
	}

	$scope.get_contents = function(){
		servercalls.get('/api/content/all', $scope.config,function(err,result){
			if(err){dialogs.openErrorDialog(JSON.stringify(err)); return;}
			else{
				$scope.newsGrid.data = result;
			}
		})
	}	
	$scope.savesorting = function(){
		var saving_array = [];
		$scope.newsGrid.data.forEach(function(data){
			saving_array.push(data._id);
		})

		servercalls.put('/api/node_weight/'+$scope.select_type,saving_array,function(err,result){
			if(err){dialogs.openErrorDialog(JSON.stringify(err)); return;}
			else{
				dialogs.openMessageDialog('News Sorting Updated');
			}
		});
	}
	//call for first time load 
	$scope.typechange();


}]);
app.controller('permissionsCtrl', ['$scope','servercalls','$state','$rootScope','dialogs', function($scope, servercalls,$state,$rootScope,dialogs){
	$rootScope.pagetitle = "Permissions";
	$rootScope.menuname = "permissions";
	$rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.permissions'>Permissions</a></li>";


	$scope.permissions_types = new Array();

	//get all roles
	servercalls.get("/api/roles/all",{},function(err,result){
		if(err){console.log(err);return;}
		else{
			$scope.roles = result;
		}
	})
	//roles permission get
	servercalls.get("/api/roles/all/permissions",{},function(err,result){
		if(err){console.log(err);return;}
		else{
			$scope.permissions = result;
			console.log("permissions result",result);
			
		}
	})
	//save json
	$scope.savePermissions = function() {
	    var json = {};
	    $scope.roles.forEach(function(role) {
	        var permissions = {};
	        Object.keys($scope.permissions).forEach(function(keyname) {
	        	permissions[keyname] = new Array();
	            $('[for="' + role._id + '"][key="' + keyname + '"]:checked').each(function() {
	                permissions[keyname].push($(this).attr('value'));
	            });

	        })
	        json[role._id] = permissions;
	    })
	    servercalls.put('/api/roles/permissions/updatepermissions',json,function(err,result){
			if(err){
					if(err == 'Permission Denied'){dialogs.openErrorDialog(err);return;}
					console.log(err);return;}
			else{
				alert('Permission Updated');
				
			}
	    })
	}





}]);
app.controller('profileCtrl', ['$scope','servercalls','ngDialog','$state','$rootScope','$storage', function($scope, servercalls,ngDialog,$state,$rootScope,$storage){
	$rootScope.$emit('pageBasic', { pagetitle: "My Profile",breadcrumb:"<li><a href='/#/dashboard'>Dashboard</a></li> <li><a href='/#/dashboard/profile'>Profile</a></li>"});
	$scope.user = $rootScope.loggedInUser;
	console.log('profile',$scope.user);
}]);
app.controller('rolesCtrl', ['$scope','servercalls','dialogs','$state','$rootScope','utils', function($scope, servercalls,dialogs,$state,$rootScope,utils){
	$rootScope.pagetitle = "Roles";
	$rootScope.menuname = "roles";
	$rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.roles'>Roles</a></li>"; 

	$scope.roles = {};
	$scope.addrole = false;

	//get all roles that exist
	servercalls.get('/api/roles/all', {}, function(err, result){
		if(err){$scope.error = err; return;
		}else{
			$scope.rolesGrid.data = result;
		}
	})

	// grid for roles
	$scope.rolesGrid= {
		columnDefs : [
		{displayName : "Roles" , field : "name"},
		{displayName : "Machine Name" , field : "machine_name" ,enableCellEdit : false},
		{displayName : "Operations" , field : "operations",enableCellEdit: false,cellTemplate: '<button ng-if="row.entity.locked == false" ng-click="grid.appScope.deleterole(row.entity,rowRenderIndex)" class="btn btn-xs btn-primary table_btns ng-scope">Delete</button>',enableSorting: false },
		]
	}

	//update call on edit of grid
	$scope.rolesGrid.onRegisterApi = function(gridApi) {
	    //set gridApi on scope
	    $scope.gridApi = gridApi;
	    gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
	       console.log('rowEntity',rowEntity);
	        if (newValue !== oldValue) {
	            servercalls.put('/api/roles/' + rowEntity.machine_name, rowEntity, function(err, result) {
	                if (err) {
  						if(err == 'Permission Denied'){dialogs.openErrorDialog(err);return;}
	                    console.log(err);
	                }
	            });
	        }
	    });
	}

	$scope.toggle = function(){
		$scope.addrole = !$scope.addrole;
		$scope.error = '';
		
	}

	//add new role
	$scope.add = function(){
		if($scope.roles.name != undefined && $scope.roles.name != ''){
			var machine_name =  utils.create_machine_name($scope.roles.name);
			servercalls.post('/api/roles/'+machine_name , {name: $scope.roles.name}, function(err, result){
				if(err){
					if(err == 'Permission Denied'){dialogs.openErrorDialog(err);return;}
					$scope.error = err;return;
				}else{
					$scope.rolesGrid.data.push(result);
					$scope.addrole = !$scope.addrole;
					$scope.roles.name = '';
				}
			})
		}else{
			$scope.error = "Please type role name";
		}
	}
	//delete role
	$scope.deleterole = function(row, index) {
		dialogs.openConfirmDialog('Delete Role<b> '+row.name+'</b>','', function(yes,no){
	      if(no){
	        console.log("dialogs CustomDialog");
	        return;
	      }else{
	      	servercalls.delete('/api/roles/' + row.machine_name,  function(err, result) {
	            if (err) {
					if(err == 'Permission Denied'){dialogs.openErrorDialog(err);return;}
	                $scope.error = err.message;
	                return;
	            } else {
	                $scope.rolesGrid.data.splice(index, 1);
	            }
	        });
	      }
	    })	
	}
}]);
app.controller('taxonomyCtrl', ['$scope','servercalls','dialogs','$state','$rootScope','utils', function($scope, servercalls,dialogs,$state,$rootScope,utils){
	$rootScope.pagetitle = "Taxonomy";
	$rootScope.menuname = "taxonomy";
	$rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.taxonomy'>Taxonomy</a></li>";

	//column details
	$scope.taxonomyGrid = {
		columnDefs : [
		{displayName : "Taxonomy term", field : "label"},
		{displayName : "Machine Name", field : "machine_name", enableCellEdit: false},
		{displayName : "Operations" , field : "operations",enableCellEdit: false , cellTemplate: '<button ng-click="grid.appScope.addTerm(row.entity)" class="btn btn-xs btn-primary table_btns">List Terms</button><button class="btn btn-xs btn-primary table_btns" ng-click="grid.appScope.deleteVocabulary(row.entity,rowRenderIndex)">Delete</button>',enableSorting: false },
		]
	}
	$scope.taxonomyGrid.data = [];
	// all taxonomy get
	servercalls.get('/api/taxonomy/all', {}, function(err, result){
		if(err){$scope.error = err;console.log(err);return;}
		else{
			$scope.taxonomyGrid.data = result;
		}
	})

	//on edit of row
	$scope.taxonomyGrid.onRegisterApi = function(gridApi) {
	    $scope.gridApi = gridApi;
	    gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
	        if (newValue !== oldValue) {
	            servercalls.put('/api/taxonomy/' + rowEntity.machine_name, rowEntity, function(err, result) {
	                if (err) {
		                if(err == 'Permission Denied'){
		 					dialogs.openErrorDialog(err);return
		 				}
	                    console.log(err);
	                }
	            });
	        }
	    });
	};

	//show add form
	$scope.toggle = function(){
		$scope.addterm = !$scope.addterm;
		$scope.error = '';
	}
	$scope.add = function(){		
		if($scope.vocabulary.label != undefined && $scope.vocabulary.label != ''){
			var string = utils.create_machine_name($scope.vocabulary.label);
			servercalls.post('/api/taxonomy/'+string, $scope.vocabulary, function(err, doc){
				if(err){
	 				if(err == 'Permission Denied'){
	 					dialogs.openErrorDialog(err);return
	 				}
					console.log("err",err);return;
				}else{
					$scope.taxonomyGrid.data.push(doc);
					$scope.addterm = !$scope.addterm;
					$scope.vocabulary.label = '';
				}
			})
		}else{
			$scope.error = "Please type Taxonomy name";
		}
	}

	$scope.deleteVocabulary =  function(row, index){
		dialogs.openConfirmDialog('Delete Taxonomy :<b> '+row.label+'</b>','', function(yes,no){
	      if(no){
	        console.log("dialogs Delete Taxonomy");
	        return;
	      }else{
	      	servercalls.delete('/api/taxonomy/'+row.machine_name,  function(err,doc){
			 	if(err){
	 				if(err == 'Permission Denied'){
	 					dialogs.openErrorDialog(err);return
	 				}

			 		console.log(err);return;}
			 	else{
			 		$scope.taxonomyGrid.data.splice(index,1);
			 	}			 	
			})
	      }
	    })		
	}

	$scope.addTerm = function(row){
		$state.go('dashboard.taxonomy_term',{taxonomy_m_name : row.machine_name});
	}



}]);
app.controller('termCtrl', ['$scope','servercalls','dialogs','$state','$rootScope','utils', function($scope, servercalls,dialogs,$state,$rootScope,utils){

	$rootScope.menuname = "taxonomy";
	$rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li><li><a ui-sref='dashboard.taxonomy'>Taxonomy</a></li>";

	//grid for term
	$scope.termGrid = {
		columnDefs : [
		{displayName : "Term name", field : "label"},
		{displayName : "Machine Name", field : "machine_name", enableCellEdit: false},
		{displayName : "Operations" , field : "operations",enableCellEdit: false , cellTemplate: '<button ng-click="grid.appScope.deleteTerm(row.entity)" class="btn btn-xs btn-primary table_btns">Delete</button>',enableSorting: false },
		]
	}

	//get terms for current taxonomy
	servercalls.get('/api/taxonomy/'+$state.params.taxonomy_m_name, {}, function(err, result){
		if(err){dialogs.openErrorDialog("No taxonomy found");return;
		}else{
			$rootScope.pagetitle = result.label;
			$scope.termGrid.data = result.terms;
		}
	})

	//toggle form show
	$scope.toggle = function(){
		$scope.addtaxonomyterm = !$scope.addtaxonomyterm;
	}
	//on edit of row
	$scope.termGrid.onRegisterApi = function(gridApi) {
	    $scope.gridApi = gridApi;
	    gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
	        if (newValue !== oldValue) {

	            servercalls.put('/api/taxonomy/' + $state.params.taxonomy_m_name + '/term/' + rowEntity.machine_name, rowEntity, function(err, result) {
	                if (err) {
		                if(err == 'Permission Denied'){
		 					dialogs.openErrorDialog(err);return
		 				}
	                    console.log(err);
	                }
	            });
	        }
	    });
	};


	$scope.add = function() {
	    if ($scope.terms.label != undefined && $scope.terms.label != '') {
	        var string = utils.create_machine_name($scope.terms.label);

	        if (_.where($scope.termGrid.data, { "machine_name": string }).length > 0) {
	            dialogs.openErrorDialog('Term Exist');
	            return;
	        } else {
	            servercalls.post('/api/taxonomy/' + $state.params.taxonomy_m_name + '/term/' + string, $scope.terms, function(err, result) {
	                if (err) {
	                    if (err == 'Permission Denied') {
	                        dialogs.openErrorDialog(err);
	                        return
	                    }
	                    console.log("err", err);
	                    return;
	                } else {
	                    console.log(result);
	                    $scope.termGrid.data = result.terms;
	                    $scope.addtaxonomyterm = !$scope.addtaxonomyterm;
	                    $scope.terms.label = '';
	                }
	            })

	        }

	    } else {
	        $scope.error = "Please type Term name";
	    }
	}


	$scope.deleteTerm =  function(row, index){
		dialogs.openConfirmDialog('Delete Term :<b> '+row.label+'</b>','', function(yes,no){
	      if(no){
	        console.log("dialogs Delete Term");
	        return;
	      }else{
	      	servercalls.delete('/api/taxonomy/'+$state.params.taxonomy_m_name+'/term/'+row.machine_name, {}, function(err,result){
			 	if(err){
	 				if(err == 'Permission Denied'){
	 					dialogs.openErrorDialog(err);return
	 				}
			 		console.log(err);return;}
			 	else{
			 		$scope.termGrid.data.splice(index,1);
			 	}			 	
			 })
	      }
	    })		
	};
	
}]);
app.controller('usersCtrl', ['$scope','servercalls','$state','dialogs','$rootScope','$compile','utils', function($scope, servercalls,$state,dialogs,$rootScope,$compile, utils){
	$rootScope.pagetitle = "Users";
	$rootScope.menuname = "users";
	$rootScope.breadcrumb = "<li><a ui-sref='dashboard'>Dashboard</a></li> <li><a ui-sref='dashboard.users'>Users</a></li>";

	//default config for pagination work
	var count = 0;
	var currentpage = 1;
	var limit = 5; 
	//get fields for showing
	$scope.config = {
	'fields' : {'local.username' : 1,'local.email' : 1,'last_login':1},
	'filter':{isadmin : false},
		'skip' : 0,
		'limit' : limit,
	};
	$scope.user = {};
	$scope.user.local ={username : '',email:''};

	//get total count of users
	servercalls.get('/api/users/all/count',{},function(err,result){
		if(err){console.log(err);return;}
		else{
			count = result;
		}
	})

	//get current page count
	$scope.getPage =function(){
		return currentpage;
	}
	//get total pages count
	$scope.getTotalPages = function(){
		return Math.ceil(count / $scope.config.limit);
	}

	//grid fields definition
	$scope.usersGrid= {
     	paginationPageSize: 5,
     	useExternalPagination: true,
		columnDefs : [
		{displayName : "Username" , field : "local.username"},
		{displayName : "Email" , field : "local.email"},
		{displayName : "Last Login" , field : "last_login"},
		{displayName : "Operations" , field : "operations",cellTemplate: '<button ng-click="grid.appScope.edituser(row.entity)" class="btn btn-xs btn-primary table_btns">Edit</button><button class="btn btn-xs btn-primary table_btns" ng-click="grid.appScope.deleteuser(row.entity,rowRenderIndex)">Delete</button>',enableSorting: false },
		]
	}

	//default set users
	get_users();

//edit page
	$scope.edituser =  function(user){
		 $state.go('dashboard.users_edit', {'uid': user._id});
	};

//Delete user
	$scope.deleteuser =  function(user, index){
	console.log(user);
		dialogs.openConfirmDialog('Are you sure want to delete user? :<b> '+user.local.username+'</b>','', function(yes,no){
	      if(no){
	        console.log("Delete user account");
	        return;
	      }else{
	      	servercalls.delete('/api/users/'+user._id,function(err,result){
				if(err){
					if(err == 'Permission Denied'){dialogs.openErrorDialog(err);return;}
					$scope.error = err; console.log(err); return;}
				else{
					$scope.usersGrid.data.splice(index,1);
				}
			})
	      }
	    })		
	}



//next page work
	$scope.nextPage = function(){
		if(currentpage < $scope.getTotalPages()){
			currentpage++;
			$scope.config.skip = $scope.config.skip + limit;
			get_users();	
		}
	}
//previous page work
	$scope.previousPage = function(){
		if(currentpage > 1 ){
			currentpage--;
			$scope.config.skip = $scope.config.skip - limit;
			get_users();	
		}
	}
// Search user by name or email
	$scope.searchUser = function(){

		delete $scope.config.searchEmail;
		delete $scope.config.searchName;

		if($scope.user.local.username != ''){
			$scope.config.searchName =  $scope.user.local.username;
		}
		else if($scope.user.local.email != ''){
			$scope.config.searchEmail = $scope.user.local.email;
			
		}
		servercalls.get('/api/users/all',$scope.config,function(err,result){
				if(err){
					$scope.error = err; console.log(err);
					return;
				}else{
					$scope.usersGrid.data = result;
					// $scope.user.local.username = '';
					// $scope.user.local.email = '';
				}
			})
	}

	$scope.disableFilter = function(){
		delete $scope.config.searchEmail;
		delete $scope.config.searchName;
		$scope.user.local ={};
		get_users();
	}

function get_users(){
	servercalls.get('/api/users/all',$scope.config,function(err,result){
		if(err){$scope.error = err; console.log(err); return;}
		else{
			result.forEach(function(user){
				console.log('login ---',user.last_login);
				user.last_login ? user.last_login = utils.timeAgo(user.last_login) : user.last_login = 'never';
			})
			$scope.usersGrid.data = result;
		}
	})
}


}]);
