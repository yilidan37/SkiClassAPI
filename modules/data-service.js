const mongoose = require("mongoose");

const bcrypt = require('bcrypt');

const classSchema = require("./classSchema.js");

const InstructorSchema =  require("./InstructorSchema.js");

const userSchema =  require("./userSchema.js");

const userProfileSchema =  require("./userProfile.js");

// const { markAsUntransferable } = require("worker_threads");



module.exports = function(connectionString){

    let Class;
    let Instructor;
    let User;
    let UserProfile;
    return {

        initialize: function(){
            return new Promise((resolve,reject)=>{
               let db1 = mongoose.createConnection(connectionString,{ useNewUrlParser: true,useUnifiedTopology: true });
                
                db1.on('error', ()=>{
            
                    reject();
                });
                db1.once('open', ()=>{
                    Instructor = db1.model("Instructor", InstructorSchema);
                    Class = db1.model("Class", classSchema);
                    User = db1.model("users",userSchema);
                    UserProfile = db1.model("userdetails",userProfileSchema);
                    resolve();
                });
            });
        },

        

        addNewUserDet: function(data){
            return new Promise((resolve,reject)=>{

                let newUserDet = new UserProfile(data);

                newUserDet.save((err) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(`new user profile: ${newUserDet.email} successfully added`);
                    }
                });
            });
        },

        getUserDetByEmail: function(input){
            return new Promise((resolve,reject)=>{
                UserProfile.findOne({email: input}).exec().then(data =>{
                    resolve(data);
                }).catch(err=>{
                    reject(err);
                });
            });
        },
        updateUserDetByEmail: function(data, inputEmail){
            return new Promise((resolve,reject)=>{
                UserProfile.updateOne({email: inputEmail}, {
                    $set: data
                }).exec().then(()=>{
                    resolve(`user profile ${inputEmail} successfully updated`)
                }).catch(err=>{
                    reject(err);
                });

            });
        },
        registerUser: function (userData) {
            return new Promise(function (resolve, reject) {
        
                // if (userData.password != userData.password2) {
                //     reject("Passwords do not match");
                // } else {
        
                    bcrypt.hash(userData.password, 10).then(hash=>{ // Hash the password using a Salt that was generated using 10 rounds
                        
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
                    .catch(err=>reject(err));
                });
            // });      
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
                                resolve(users[0]);
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

        addNewInstructor: function(data){
            return new Promise((resolve,reject)=>{

                let newInstructor = new Instructor(data);

                newInstructor.save((err) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(`new instructor: ${newInstructor._id} successfully added`);
                    }
                });
            });
        },

        addNewClass: function(data){
            return new Promise((resolve,reject)=>{

                let newClass = new Class(data);

                newClass.save((err) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(`new class: ${newClass._id} successfully added`);
                    }
                });
            });
        },

        getAllInstructor: function(page, perPage){
            return new Promise((resolve,reject)=>{
                if(+page && +perPage){
                        page = (+page) - 1;
                        Instructor.find().sort({RegisterDate: -1}).skip(page * +perPage).limit(+perPage).exec().then(instructors=>{
                            resolve(instructors)
                        }).catch(err=>{
                            reject(err);
                        });
                }else{
                    reject('page and perPage query parameters must be present');
                }
            });
            
        },

        getAllClass: function(page, perPage){
            return new Promise((resolve,reject)=>{
                if(+page && +perPage){
                        page = (+page) - 1;
                        Class.find().sort({classDate: -1}).skip(page * +perPage).limit(+perPage).exec().then(classes=>{
                            resolve(classes)
                        }).catch(err=>{
                            reject(err);
                        });
                }else{
                    reject('page and perPage query parameters must be present');
                }
            });
            
        },

        getInstructorByNumber: function(num){
            return new Promise((resolve,reject)=>{
                Instructor.findOne({InstructorNum: num}).exec().then(data =>{
                    resolve(data);
                }).catch(err=>{
                    reject(err);
                });
            });
        },

        getClassById: function(id){
            return new Promise((resolve,reject)=>{
                Class.findOne({_id: id}).exec().then(data =>{
                    resolve(data);
                }).catch(err=>{
                    reject(err);
                });
            });
        },

        updateInstructorByNumber: function(data, num){
            return new Promise((resolve,reject)=>{
                Instructor.updateOne({InstructorNum: num}, {
                    $set: data
                }).exec().then(()=>{
                    resolve(`Instructor ${num} successfully updated`)
                }).catch(err=>{
                    reject(err);
                });

            });
        },

        updateClassById: function(data, id){
            return new Promise((resolve,reject)=>{
                Class.updateOne({_id: id}, {
                    $set: data
                }).exec().then(()=>{
                    resolve(`class ${id} successfully updated`)
                }).catch(err=>{
                    reject(err);
                });

            });
        },
        deleteInstructorByNumber: function(num){
            return new Promise((resolve,reject)=>{
                Instructor.deleteOne({InstructorNum: num}).exec().then(()=>{
                    resolve(`Instructor ${num} successfully deleted`)
                }).catch(err=>{
                    reject(err);
                });
            });
        },

        deleteClassById: function(id){
            return new Promise((resolve,reject)=>{
                Class.deleteOne({_id: id}).exec().then(()=>{
                    resolve(`Class ${id} successfully deleted`)
                }).catch(err=>{
                    reject(err);
                });
            });
        }

    }

}