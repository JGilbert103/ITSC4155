const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

// hash the password
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const userModel = mongoose.model("users", userSchema)
module.exports = userModel;