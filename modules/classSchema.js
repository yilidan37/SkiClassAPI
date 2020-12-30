const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let classSchema = new Schema({
    classId: Number,
    classDate: Date,
    classTime: String,
    classHours: Number,
    classLocation: String,
    classLevel: String,
    instructorName: String,
    instructorEmail: String,
    classDes: String,
    classCap: Number,
    minAge: Number,
    maxAge: Number,
    classType: String,
    Price: Number,
    IsCancel: {
        "type":Boolean,
        "default":false
    },
    RegistedNumber: Number
    
});

module.exports = classSchema;