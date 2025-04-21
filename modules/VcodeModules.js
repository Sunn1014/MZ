const mongoose = require('mongoose')

const verificationCodeSchema = new mongoose.Schema({
    vcode : Number 
},{timestamp : true})

const Code = new mongoose.model('Code', verificationCodeSchema);

module.exports = Code