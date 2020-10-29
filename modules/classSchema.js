const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let classSchema = new Schema({
    classDate: Date,
    classTime: String,
    classHours: Number,
    classLocation: String,
    classLevel: String,
    instructorName: String,
    instructorEmail: String,
    classDes: String,
    classCap: Number,
    classType: String,
    Price: Number,
    RegistedNumber: Number
    
});

module.exports = classSchema;