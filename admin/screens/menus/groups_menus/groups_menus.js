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