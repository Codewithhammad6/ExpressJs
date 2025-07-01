const expess = require('express');
const mongoose = require('mongoose');

const studentSchema=new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        required: true,
        unique: true
    },
    gender:{
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    profile_pic:{
        type: String,
    }

})
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;