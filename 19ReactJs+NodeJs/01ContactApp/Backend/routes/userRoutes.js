const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { body, validationResult } = require("express-validator");

dotenv.config();



router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("GET Users Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.error("DELETE User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


const validationRegistration = [
  body("username")
    .notEmpty().withMessage("Username is required.")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long.")
    .trim()
    .isAlpha().withMessage("Username must contain only letters.")
    .toLowerCase()
    .custom((value) => {
      if (value === "admin") {
        throw new Error('Username "admin" not allowed.');
      }
      return true;
    }),

  body("email")
    .isEmail().withMessage("Valid email is required.")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 5, max: 10 }).withMessage("Password must be between 5 and 10 characters long.")
    .isStrongPassword().withMessage("Password must include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character."),
];


router.post("/register", validationRegistration, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return all validation errors
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Username already exist" });
  }
});


router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid username" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/logout", (req, res) => {
  res.status(200).json({ message: "User logged out successfully" });
});

module.exports = router;
