const mongoose = require("mongoose");

const bcrypt = require('bcryptjs');

const classSchema = require("./classSchema.js");

const InstructorSchema = require("./InstructorSchema.js");

const userSchema = require("./userSchema.js");

const userProfileSchema = require("./userProfile.js");

const counterSchema = require("./counterSchema");

const classActiveSchema = require("./classActiveSchema");

const classOrderSchema = require("./classOrderSchema");

const skierReviewSchema = require("./SkierReviewSchema");

const skiInstructorReviewSchema = require("./SkiInstructorReviewSchema");

// function getNextInstructorSequenceValue(InstructorID, connectionString) {
//     let db1 = mongoose.createConnection(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

//     // db1.createCollection("skiInstructorCounter");
//     // db1.skiInstructorCounter.insert({"id": "InstructorID","sequence_value": 100000})
//     // WriteResult({ "nInserted" : 1 });
//     var sequenceDocument = db1.counters.findAndModify({
//         query: { id: InstructorID },
//         update: { $inc: { sequence_value: 1 } },
//         new: true
//     });
//     return sequenceDocument.sequence_value;
// };

module.exports = function (connectionString) {

    let Class;
    let Instructor;
    let User;
    let UserProfile;
    let Counter;
    let ClassActive;
    let ClassOrder;
    let SkierReview;
    let SkiInstructorReview;

    return {

        initialize: function () {
            return new Promise((resolve, reject) => {
                let db1 = mongoose.createConnection(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

                db1.on('error', () => {

                    reject();
                });
                db1.once('open', () => {
                    Instructor = db1.model("Instructor", InstructorSchema);
                    Class = db1.model("Class", classSchema);
                    User = db1.model("users", userSchema);
                    UserProfile = db1.model("userdetails", userProfileSchema);
                    Counter = db1.model("counters", counterSchema);
                    ClassActive = db1.model("classactives", classActiveSchema);
                    ClassOrder = db1.model("classOrders", classOrderSchema);
                    SkierReview = db1.model("skierReviews", skierReviewSchema);
                    SkiInstructorReview = db1.model("skiInstructorReviews", skiInstructorReviewSchema);
                    resolve();
                });
            });
        },

        addNewClass: function (data) {
            return new Promise((resolve, reject) => {
                let classCounter;
                let classActiveCounter;
                Counter.findOne({ counterType: "classId" }).exec().then(data1 => {
                    classCounter = data1.sequence_value + 1;
                    Counter.updateOne({ counterType: "classId" }, {
                        $set: { sequence_value: classCounter }
                    }).exec()
                        .then()
                        .catch(err => {
                            reject(err);
                        });
                    // data.classId = classCounter;
                    let newClass = new Class(data);
                    newClass.classId =classCounter;
                    newClass.save((err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(`new class: ${newClass.classId} successfully added`);
                        }
                    });
                    Counter.findOne({ counterType: "PostId" }).exec().then(data2 => {
                        classActiveCounter = data2.sequence_value + 1;
                        Counter.updateOne({ counterType: "PostId" }, {
                            $set: { sequence_value: classActiveCounter }
                        }).exec()
                            .then()
                            .catch(err => {
                                reject(err);
                            });

                        let newclassActive = new ClassActive();
                        newclassActive.PostId =classActiveCounter;
                        newclassActive.ClassId = classCounter;
                        newclassActive.InstructorId = data.InstructorId;
                        newclassActive.ClassAction = "Post";
                        newclassActive.PostDate = (new Date()).toString();
                        newclassActive.save((err)=>{
                            if(err){
                                reject(err);
                            }else{
                                resolve(`new class active: ${newclassActive.PostId} successfully added`);
                            }
                        })

                    })

                })


            });
        },

        addNewClassOrder: function (data) {
            return new Promise((resolve, reject) => {
                let classOrderCounter;
                Counter.findOne({ counterType: "classOrderID" }).exec().then(data1 => {
                    //syc
                    classOrderCounter = data1.sequence_value + 1;
                    // console.log(instructorCounter + "  <--->   "+ data1);
                    Counter.updateOne({ counterType: "classOrderID" }, {
                        $set: { sequence_value: classOrderCounter }
                    }).exec()
                        .then()
                        .catch(err => {
                            reject(err);
                        });
                    data.OrderId = classOrderCounter;
                    let newClassOrder = new ClassOrder(data);
                    newClassOrder.save((err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(`new class order: ${newClassOrder.OrderId} successfully added`);
                        }
                    });
                }).catch(err => {
                    reject(err);
                });

            });
        },

        addNewInstructor: function (data) {
            return new Promise((resolve, reject) => {
                let instructorCounter;
                Counter.findOne({ counterType: "SkiInstructorID" }).exec().then(data1 => {
                    instructorCounter = data1.sequence_value + 1;
                    // console.log(instructorCounter + "  <--->   "+ data1);
                    Counter.updateOne({ counterType: "SkiInstructorID" }, {
                        $set: { sequence_value: instructorCounter }
                    }).exec()
                        .then()
                        .catch(err => {
                            reject(err);
                        });
                    data.InstructorID = instructorCounter;
                    let newInstructor = new Instructor(data);
                    newInstructor.save((err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(`new instructor: ${newInstructor.InstructorID} successfully added`);
                        }
                    });
                }).catch(err => {
                    reject(err);
                });

            });
        },

        addNewUserDet: function (data) {
            return new Promise((resolve, reject) => {

                let newUserDet = new UserProfile(data);

                newUserDet.save((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(`new user profile: ${newUserDet.email} successfully added`);
                    }
                });
            });
        },

        // addNewSkierReview: function (data) {
        //     return new Promise((resolve, reject) => {
        //         let skierReviewCounter;
        //         Counter.findOne({ counterType: "SkierReviewId" }).exec().then(data1 => {
        //             skierReviewCounter = data1.sequence_value + 1;
        //             // console.log(instructorCounter + "  <--->   "+ data1);
        //             Counter.updateOne({ counterType: "SkierReviewId" }, {
        //                 $set: { sequence_value: skierReviewCounter }
        //             }).exec()
        //                 .then()
        //                 .catch(err => {
        //                     reject(err);
        //                 });
        //             data.skierReviewId = skierReviewCounter;
        //             let newSkierReview = new SkierReview(data);
        //             newSkierReview.save((err) => {
        //                 if (err) {
        //                     reject(err);
        //                 } else {
        //                     resolve(`new skier review: ${newSkierReview.skierReviewId} successfully added`);
        //                 }
        //             });
        //         }).catch(err => {
        //             reject(err);
        //         });

        //     });
        // },

        // getSkierReviewByAuthorId: function (id,page, perPage) {
        //     return new Promise((resolve, reject) => {
        //         if (+page && +perPage) {
        //             page = (+page) - 1;
        //             SkierReview.find({
        //                 isActive: true,
        //                 authorId: id
        //             }).sort({ reviewDate: -1 }).skip(page * +perPage).limit(+perPage).exec().then(skierReveiws => {
        //                 resolve(skierReveiws)
        //             }).catch(err => {
        //                 reject(err);
        //             });
        //         } else {
        //             reject('page and perPage query parameters must be present');
        //         }
        //     });
        // },

        // getSkierReviewBySkierEmail: function (email,page, perPage) {
        //     return new Promise((resolve, reject) => {
        //         if (+page && +perPage) {
        //             page = (+page) - 1;
        //             SkierReview.find({
        //                 isActive: true,
        //                 toSkier: email
        //             }).sort({ reviewDate: -1 }).skip(page * +perPage).limit(+perPage).exec().then(skierReveiws => {
        //                 resolve(skierReveiws)
        //             }).catch(err => {
        //                 reject(err);
        //             });
        //         } else {
        //             reject('page and perPage query parameters must be present');
        //         }
        //     });
        // },

        // updateSkierReviewById: function (data, id) {
        //     return new Promise((resolve, reject) => {
        //         SkierReview.updateOne({ skierReviewId: id }, {
        //             $set: data
        //         }).exec().then(() => {
        //             resolve(`Skier Review id:${id} successfully updated`)
        //         }).catch(err => {
        //             reject(err);
        //         });

        //     });
        // },

        addNewSkiInstructorReview: function (data) {
            return new Promise((resolve, reject) => {
                let skiInstructorReviewCounter;
                Counter.findOne({ counterType: "SkiInstructorReviewId" }).exec().then(data1 => {
                    skiInstructorReviewCounter = data1.sequence_value + 1;
                    // console.log(instructorCounter + "  <--->   "+ data1);
                    Counter.updateOne({ counterType: "SkiInstructorReviewId" }, {
                        $set: { sequence_value: skiInstructorReviewCounter }
                    }).exec()
                        .then()
                        .catch(err => {
                            reject(err);
                        });
                    data.skiInstructorReviewId = skiInstructorReviewCounter;
                    let newSkiInstructorReview = new SkiInstructorReview(data);
                    newSkiInstructorReview.save((err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(`new ski instructor review: ${newSkiInstructorReview.skiInstructorReviewId} successfully added`);
                        }
                    });
                }).catch(err => {
                    reject(err);
                });

            });
        },

        getSkiInstructorReviewByAuthorEmail: function (email,page, perPage) {
            return new Promise((resolve, reject) => {
                if (+page && +perPage) {
                    page = (+page) - 1;
                    SkiInstructorReview.find({
                        isActive: true,
                        authorEmail: email
                    }).sort({ reviewDate: -1 }).skip(page * +perPage).limit(+perPage).exec().then(skiInstructorReveiws => {
                        resolve(skiInstructorReveiws)
                    }).catch(err => {
                        reject(err);
                    });
                } else {
                    reject('page and perPage query parameters must be present');
                }
            });
        },

        getAllSkiInstructorReviewByInstructorEmail: function (email) {
            return new Promise((resolve, reject) => {
                SkiInstructorReview.find({
                    isActive: true,
                    toSkiInstructor: email
                }).sort({ reviewDate: -1 }).exec().then(skiInstructorReveiws => {
                    resolve(skiInstructorReveiws)
                }).catch(err => {
                    reject(err);
                });
            });
        },

        // getSkiInstructorReviewByInstructorId: function (id,page, perPage) {
        //     return new Promise((resolve, reject) => {
        //         if (+page && +perPage) {
        //             page = (+page) - 1;
        //             SkiInstructorReview.find({
        //                 isActive: true,
        //                 toSkiInstructor: id
        //             }).sort({ reviewDate: -1 }).skip(page * +perPage).limit(+perPage).exec().then(skiInstructorReveiws => {
        //                 resolve(skiInstructorReveiws)
        //             }).catch(err => {
        //                 reject(err);
        //             });
        //         } else {
        //             reject('page and perPage query parameters must be present');
        //         }
        //     });
        // },
        getSkiInstructorReviewByOrderId: function (id) {
            return new Promise((resolve, reject) => {
                SkiInstructorReview.findOne({ orderId: id }).exec().then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        updateSkiInstructorReviewById: function (data, id) {
            return new Promise((resolve, reject) => {
                SkiInstructorReview.updateOne({ skiInstructorReviewId: id }, {
                    $set: data
                }).exec().then(() => {
                    resolve(`Ski Instrucotr Review id:${id} successfully updated`)
                }).catch(err => {
                    reject(err);
                });

            });
        },
        getUserDetByEmail: function (input) {
            return new Promise((resolve, reject) => {
                UserProfile.findOne({ email: input }).exec().then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        updateUserDetByEmail: function (data, inputEmail) {
            return new Promise((resolve, reject) => {
                UserProfile.updateOne({ email: inputEmail }, {
                    $set: data
                }).exec().then(() => {
                    resolve(`user profile ${inputEmail} successfully updated`)
                }).catch(err => {
                    reject(err);
                });

            });
        },
        registerUser: function (userData) {
            return new Promise(function (resolve, reject) {

                bcrypt.hash(userData.password, 10).then(hash => { // Hash the password using a Salt that was generated using 10 rounds

                    userData.password = hash;

                    let newUser = new User(userData);

                    newUser.save((err) => {
                        if (err) {
                            if (err.code == 11000) {
                                reject(`Can not register. Email ${userData.email} already registered!`);
                            } else {
                                reject("There was an error creating the user: " + err);
                            }

                        } else {
                            resolve("User " + userData.email + " successfully registered. Please click Login button to login!");
                        }
                    });
                })
                    .catch(err => reject(err));
            });
        },

        checkUser: function (userData) {
            return new Promise(function (resolve, reject) {

                User.find({ email: userData.email })
                    .limit(1)
                    .exec()
                    .then((users) => {

                        if (users.length == 0) {
                            reject("Unable to find user " + userData.email);
                        } else {
                            bcrypt.compare(userData.password, users[0].password).then((res) => {
                                if (res === true) {
                                    var newHistory = {
                                        dateTime: (new Date()).toString(),
                                        userAgent: userData.userAgent,
                                        IPAddress: userData.IPAddress.toString()
                                    }
                                    users[0].loginHistory.push(newHistory);
                                    User.updateOne(
                                        { email: users[0].email },
                                        { $set: { loginHistory: users[0].loginHistory } }
                                    ).exec()
                                        .then(() => {
                                            resolve(users[0]);
                                        })
                                        .catch((err) => {
                                            rejrct("There is an error verifying the user: " + err);
                                        })

                                } else {
                                    reject("Incorrect password for user " + userData.email);
                                }
                            });
                        }
                    }).catch((err) => {
                        reject("Unable to find user " + userData.email);
                    });
            });
        },

        // bcrypt.compare(userData.password, users[0].password).then((res) => {
        //     if (res === true) {
        //         resolve(users[0]);
        //     } else {
        //         reject("Incorrect password for user " + userData.email);
        //     }
        // });


        getAllInstructor: function (page, perPage) {
            return new Promise((resolve, reject) => {
                if (+page && +perPage) {
                    page = (+page) - 1;
                    Instructor.find().sort({ RegisterDate: -1 }).skip(page * +perPage).limit(+perPage).exec().then(instructors => {
                        resolve(instructors)
                    }).catch(err => {
                        reject(err);
                    });
                } else {
                    reject('page and perPage query parameters must be present');
                }
            });

        },

        getAllClass: function (page, perPage) {
            return new Promise((resolve, reject) => {
                if (+page && +perPage) {
                    page = (+page) - 1;
                    Class.find().sort({ classDate: -1 }).skip(page * +perPage).limit(+perPage).exec().then(classes => {
                        resolve(classes)
                    }).catch(err => {
                        reject(err);
                    });
                } else {
                    reject('page and perPage query parameters must be present');
                }
            });

        },

        getInstructorByNumber: function (num) {
            return new Promise((resolve, reject) => {
                Instructor.findOne({ InstructorID: num }).exec().then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });
            });
        },

        getInstructorByEmail: function (input) {
            return new Promise((resolve, reject) => {
                Instructor.findOne({ Email: input }).exec().then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });
            });
        },

        getClassById: function (id) {
            return new Promise((resolve, reject) => {
                Class.findOne({ _id: id }).exec().then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });
            });
        },

        getClassOrderById: function (id) {
            return new Promise((resolve, reject) => {
                ClassOrder.findOne({ OrderId: id }).exec().then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });
            });
        },

        getClassOrderByUserEmail: function (email) {
            return new Promise((resolve, reject) => {
                ClassOrder.find({ UserEmail: email }).sort({ classDate: -1 }).exec().then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });
            });
        },

        getClassOrderByClassId: function (id) {
            return new Promise((resolve, reject) => {
                ClassOrder.find({ ClassId: id }).sort({ classDate: -1 }).exec().then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });
            });
        },

        getClassByInstructorEmail: function (email) {
            return new Promise((resolve, reject) => {
                Class.find({ instructorEmail: email }).sort({ classDate: -1 }).exec().then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });
            });
        },

        updateClassOrderByOrderId: function (data, id) {
            return new Promise((resolve, reject) => {
                ClassOrder.updateOne({ OrderId: id }, {
                    $set: data
                }).exec().then(() => {
                    resolve(`Class order id:${id} successfully updated`)
                }).catch(err => {
                    reject(err);
                });

            });
        },

        updateClassOrderByClassId: function (data, id) {
            return new Promise((resolve, reject) => {
                ClassOrder.updateMany({ ClassId: id }, {
                    $set: data
                }).exec().then(() => {
                    resolve(`Class order with class id: ${id} successfully updated`)
                }).catch(err => {
                    reject(err);
                });

            });
        },

        updateInstructorByNumber: function (data, num) {
            return new Promise((resolve, reject) => {
                Instructor.updateOne({ InstructorID: num }, {
                    $set: data
                }).exec().then(() => {
                    resolve(`Instructor ${num} successfully updated`)
                }).catch(err => {
                    reject(err);
                });

            });
        },

        updateClassById: function (data, id) {
            return new Promise((resolve, reject) => {
                Class.updateOne({ _id: id }, {
                    $set: data
                }).exec().then(() => {
                    resolve(`class ${id} successfully updated`)
                }).catch(err => {
                    reject(err);
                });

            });
        },

        deleteInstructorByNumber: function (num) {
            return new Promise((resolve, reject) => {
                Instructor.deleteOne({ InstructorNum: num }).exec().then(() => {
                    resolve(`Instructor ${num} successfully deleted`)
                }).catch(err => {
                    reject(err);
                });
            });
        },

        deleteClassById: function (id) {
            return new Promise((resolve, reject) => {
                Class.deleteOne({ _id: id }).exec().then(() => {
                    resolve(`Class ${id} successfully deleted`)
                }).catch(err => {
                    reject(err);
                });
            });
        }

    }

}