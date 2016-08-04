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