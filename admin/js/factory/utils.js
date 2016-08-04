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