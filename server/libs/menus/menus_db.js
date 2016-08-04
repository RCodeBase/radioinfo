// load the things we need
var mongoose = require('mongoose')   ,
Schema = mongoose.Schema,
uniqueValidator = require('mongoose-unique-validator');

// define the schema for our menus
var menusSchema = mongoose.Schema({
        group_name  : { type: String},
        machine_name : {type: String, required: true, unique: true ,uniqueCaseInsensitive: true},
        menus : [{}],
        locked : {type : String ,default : false}
});
menusSchema.plugin(uniqueValidator);
module.exports = mongoose.model('menus', menusSchema);