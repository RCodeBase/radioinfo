// load the things we need
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// define the schema for our roles
var rolesSchema = mongoose.Schema({
        name : { type: String},
        machine_name : { type: String, required: true, unique: true ,uniqueCaseInsensitive: true},
        permissions :{},
        locked : { type: Boolean, default: false }
});

module.exports = mongoose.model('roles', rolesSchema);


