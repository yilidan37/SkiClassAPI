const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let userProfileSchema = new Schema({
    email:{
        "type":String,
        "unique":true
    },
    name:String,
    img: { 
        data: Buffer, 
        contentType: String 
    } ,
    skiSnowboard:String,
    skiLevel: String,
    reservedClass:[],
    status:[String],
    favoriteLocation:[String],
    message:[{ author: String, message: String, date: Date }],
    Taget:[],
    Reviews: [{ author: String, comment: String, date: Date }],
    loginHistory:[{
        "dateTime":Date,
        "userAgent":String
    }]
});

module.exports = userProfileSchema;