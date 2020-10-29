const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let InstructorSchema = new Schema({

    RegisterDate: Date,
    InstructorNum: Number,
    Email: String,
    FirstName: String,
    LastName: String,
    AuthorizedInstitution: String,
    InstructorLevel: Number,
    LisenceNum: Number,
    ExpireDate: Date,
    isActivate: Boolean,
    TeachingArea:[String],
    Language:[String],
    Reviews: [{ author: String, comment: String, date: Date }]
    
});

module.exports = InstructorSchema;