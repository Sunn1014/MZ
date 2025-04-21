const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
     firstname :{
        String
     },
     lastname :{
        String
     },
     email :{
        String
     },
     password :{
        Number
     }
},{timestamps : true})

const User = new mongoose.model('User', UserSchema)

module.exports = User