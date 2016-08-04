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