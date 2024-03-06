const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required : true,
        min: 3,
        max: 30,
        unique: true
    },
    email: {
        type: String,
        required : true,
        unique: true,
        max: 50
    },
    password: {
        type: String,
        required : true,
        min: 8,
    },
    isAvatarImagesSet: {
        type: Boolean,
        default: false
    },
    avatarImage:{
        type: String,
        default: ""
    }
})

module.exports = mongoose.model("Users" , userSchema);