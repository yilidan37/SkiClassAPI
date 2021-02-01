const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let skierReviewSchema = new Schema({
    skierReviewId: Number,
    authorId: Number,
    toSkier: String,
    reviewDate: Date,
    satisfactionIndex: Number,
    reviewContent: String,
    isActive: {
        "type":Boolean,
        "default":true
    }
});

module.exports = skierReviewSchema;