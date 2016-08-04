// load the things we need
var mongoose = require('mongoose')   ,
Schema = mongoose.Schema,
uniqueValidator = require('mongoose-unique-validator');

// define the schema for contnet types
var contentTypeSchema = mongoose.Schema({
        label  : { type: String },
        machine_name  : { type: String, required: true, unique: true ,uniqueCaseInsensitive: true},
        url  : { type: String},
        comments : {type : Boolean ,default : true},
        publish : {type : Boolean ,default : true},
        fields: [
	        { label:String ,
	         machine_name :  {type: String},
	         type : { type: Object},
	         reference_type : {},
	         allowed_values : {},
	         widget_type : {type: String, default : 'auto'},
	         ref_limit : Number,
	         required : Boolean,
	         default_value : {},
	         display_on_body : {type: Boolean,default:true},
	         weight : Number
	     	}],
        settings : {},
});
contentTypeSchema.plugin(uniqueValidator);
module.exports = mongoose.model('content_types', contentTypeSchema);