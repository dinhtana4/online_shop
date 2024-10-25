const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String
    },
    admin: {
        required: true,
        type: Boolean,
        default: false
    }
})

const UserModel = mongoose.model('user', UserSchema)
module.exports = UserModel