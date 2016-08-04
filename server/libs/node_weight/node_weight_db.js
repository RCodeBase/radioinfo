// load the things we need
var mongoose = require('mongoose')   ,
Schema = mongoose.Schema;

// define the schema for contnet types
var NodeWeightSchema = mongoose.Schema({
        type  : { type: String},
       	content : [{ type: Schema.Types.ObjectId, ref: 'contents'}],
});
module.exports = mongoose.model('node_weights', NodeWeightSchema);