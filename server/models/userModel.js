const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const userSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    typeOfUser: {
        type: String,
        default: 'user'
    },
    password: {
        type: String,
        required: true

    }
})

const User = new mongoose.model('user', userSchema)

module.exports = {
    User: User,
    userSchema: userSchema
}