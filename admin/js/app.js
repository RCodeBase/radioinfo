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
