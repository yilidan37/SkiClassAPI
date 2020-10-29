const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let userSchema = new Schema({
    email:{
        "type":String,
        "unique":true
    },
    password:String,
    name:String,
    loginHistory:[{
        "dateTime":Date,
        "userAgent":String
    }]
});

module.exports = userSchema;