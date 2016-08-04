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
