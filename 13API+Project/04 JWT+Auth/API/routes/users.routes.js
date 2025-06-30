const express= require('express');
const router=express.Router();
const User=require('../models/users.model')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();




router.post('/register',async (req,res)=>{
try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{username},{email}]})
 if(existingUser) return res.status(400).json({ message: 'Username or email already exists' });
 
const hashedPassword =await bcrypt.hash(password, 10)
const user = new User({username, email, password: hashedPassword });
const saveUser=await user.save();
res.json(saveUser)

} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
})



router.post('/login',async (req,res)=>{
try {
    const { username, password } = req.body;
const user = await User.findOne({username});
if(!user) return res.status(400).json({ message: 'Invalid username' });

const isMatch =await bcrypt.compare(password, user.password)
if(!isMatch) return res.status(400).json({ message: 'Invalid password' });

const token =jwt.sign({userId: user._id, username: user.username}, process.env.JWT_SECRET, { expiresIn: '1h' });
res.json({ token });

} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
}


})



router.post('/logout',async (req,res)=>{
    res.json({ message: 'User logged out successfully' });
})

module.exports=router;