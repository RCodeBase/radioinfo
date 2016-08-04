// load the things we need
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt   = require('bcrypt-nodejs'),
    uniqueValidator = require('mongoose-unique-validator');
    
// define the schema for our user model
var userSchema = mongoose.Schema({
    isadmin           : { type: Boolean, default: false },
    type           : { type:String},
    status            : { type: Boolean, default: true },
    roles         :[{ type: Schema.Types.ObjectId, ref: 'roles'}],
    verification_code : String,
    verified          : { type: Boolean, default: false }, 
    reset_pass_token  : String,
    created_on        : { type: Date, default: Date.now },
    last_login        : { type: Date},
    profile_fields    : {},
    
    local             : {
        username      : { type: String, required: true, unique: true ,uniqueCaseInsensitive: true},
        email         : { type: String, required: true, unique: true ,uniqueCaseInsensitive: true},
        password      : { type: String, required: true}
    }
});

// Apply the uniqueValidator plugin to userSchema. 
userSchema.plugin(uniqueValidator);

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Users', userSchema);