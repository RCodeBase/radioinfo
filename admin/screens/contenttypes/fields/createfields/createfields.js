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
