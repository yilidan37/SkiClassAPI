const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let classOrderSchema = new Schema({
    OrderId: Number,
    ClassId: Number,
    UserEmail: String,
    PaymentId: Number,
    Discount: Number,
    OrderDate: Date,
    Amount: Number,
    IsCancel: {
        "type":Boolean,
        "default":false
    },
    IsFinish: {
        "type":Boolean,
        "default":false
    },
    IsConfirm: {
        "type":Boolean,
        "default":false
    },
    Des: String   
});

module.exports = classOrderSchema;