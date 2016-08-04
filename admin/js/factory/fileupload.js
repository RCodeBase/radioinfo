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
