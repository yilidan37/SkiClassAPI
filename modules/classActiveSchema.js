const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let classActiveSchema = new Schema({
    PostId: Number,
    ClassId: Number,
    InstructorId: Number,
    ClassAction: String,
    PostDate: Date    
});

module.exports = classActiveSchema;