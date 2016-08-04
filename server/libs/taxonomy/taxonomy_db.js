// load the things we need =
var mongoose = require('mongoose')   ,
Schema = mongoose.Schema,
uniqueValidator = require('mongoose-unique-validator');


// define the schema for our menus
var taxonomySchema = mongoose.Schema({
    label  : { type: String, required: true},
    machine_name  : { type: String, required: true, unique: true ,uniqueCaseInsensitive: true},
    terms : [{label : String , machine_name :  { type: String}, description : String ,link : String ,weight :Number}],
    weight : {type : Number ,default : 0 }
});
taxonomySchema.plugin(uniqueValidator);
module.exports = mongoose.model('taxonomys', taxonomySchema);