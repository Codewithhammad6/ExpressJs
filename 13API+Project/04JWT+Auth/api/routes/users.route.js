const express = require("express");
const router = express.Router();
const User = require("../model/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


router.get('/', async (req, res) => {
  try {
    
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/register',async (req,res)=>{
try {
    const { username, email, password } = req.body;
const expistingUser = await User.findOne({
        $or: [
            { username },
            { email }
        ]
    });
    if (expistingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    const saveUser = await user.save();
    res.json(saveUser);

} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
})



router.post('/login', async (req, res) => {
 const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid username' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

const token = jwt.sign({userId: user._id , username: user.username}, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



router.post('/logout',async (req,res)=>{
    res.json({ message: 'User logged out successfully' });
})



module.exports = router;
