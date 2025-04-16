const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    role: { type: Number, enum: [1, 2, 3], default: 1 } // 1 = user, 2 = admin, 3 = maintenance
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