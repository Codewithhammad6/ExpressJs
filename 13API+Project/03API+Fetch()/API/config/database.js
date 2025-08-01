const express= require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();


const connectDB=()=>{mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Successfully Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
})}

module.exports = connectDB;