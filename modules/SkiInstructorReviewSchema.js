const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let SkiInstructorReviewSchema = new Schema({
    skiInstructorReviewId: Number,
    orderId: Number,
    authorEmail: String,
    toSkiInstructor: String,
    reviewDate: Date,
    teachingSkills: Number,
    skiSkills: Number,
    satisfactionIndex: Number,
    recommendIndex: Number,
    reviewContent: String,
    isActive: {
        "type":Boolean,
        "default":true
    }
});

module.exports = SkiInstructorReviewSchema;