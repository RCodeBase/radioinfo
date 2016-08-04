// load the things we need
var mongoose = require('mongoose')   ,
Schema = mongoose.Schema,
uniqueValidator = require('mongoose-unique-validator');

// define the schema for our menus
var contentSchema = mongoose.Schema({
		title : String,
 	    machine_name : {type: String,required:true,unique:true },
      publish  : { type: Boolean, default :true},
    	contenttype : { type: Schema.Types.ObjectId, ref: 'content_types'},
    	contenttype_machine_name : {type : String,required: true},
    	creator : { type: Schema.Types.ObjectId, ref: 'Users'},
   		comments  : { type: Boolean, default :true},
      user_comments :[{uid :{type: Schema.Types.ObjectId, ref: 'users'},data :{}, status :  { type: Boolean, default :false}, comment_date : { type: Date, default: Date.now } }],
   		created_on : { type: Date, default: Date.now },
   		updated_on : { type: Date },      
   		fields : {}
   		// state 
   		// url 
});
// contentSchema.index({machine_name:1, contenttype_machine_name:1}, { unique: true });
contentSchema.plugin(uniqueValidator);
module.exports = mongoose.model('contents', contentSchema);