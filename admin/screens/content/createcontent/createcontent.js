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