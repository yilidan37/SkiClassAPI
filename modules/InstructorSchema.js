const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let InstructorSchema = new Schema({

    RegisterDate: Date,
    InstructorID: Number,
    Email: String,
    FirstName: String,
    LastName: String,
    AuthorizedInstitution: String,
    InstructorLevel: Number,
    LisenceNum: Number,
    ExpireDate: Date,
    isActivate: {
        "type":Boolean,
        "default":false
    },
    TeachingArea:[String],
    Language:[String],
    Reviews: [{ author: String, comment: String, date: Date }],
    img: { 
        data: Buffer, 
        contentType: String 
    } ,
    
});

module.exports = InstructorSchema;