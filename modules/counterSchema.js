const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let counterSchema = new Schema({
    counterType:{
        "type": String,
        "unique":true
    },
    sequence_value: Number
});

module.exports = counterSchema;