const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
    },

    phone: {
        type: String,
        require: true,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

    password: {
        type: String,
        require: true,
    },

},{ timestamps: true})


const UserModel = mongoose.model("users", userSchema);



module.exports = UserModel;