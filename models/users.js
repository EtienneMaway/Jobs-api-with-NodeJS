const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Users = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
})


module.exports = mongoose.model('User', Users)

