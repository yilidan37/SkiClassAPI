const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let SkiInstructorReviewSchema = new Schema({
    skiInstructorReviewId: Number,
    authorEmail: String,
    toSkiInstructor: Number,
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