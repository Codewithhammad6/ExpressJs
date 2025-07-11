const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const multer = require('multer');

const mongoDB = require('./config/database');
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');

require('dotenv').config();

mongoDB();
const PORT = process.env.PORT || 5000;

// Rate limit middleware
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later."
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// CORS for frontend React
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Apply routes
app.use('/api/auth', authRoutes);      // /login and /google-login
app.use(limiter);
app.use('/api/auth', userRoutes);      // register etc.
app.use(authMiddleware);               // protect the routes below
app.use('/api/contact', contactRoutes); // secured routes

// Multer error handler
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  } else if (err) {
    return res.status(500).json({ message: 'Unknown error occurred.' });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
