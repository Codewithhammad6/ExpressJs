//Rate limit  boot force attack protect
// npm install express-rate-limit

// const rateLimit = require("express-rate-limit")

// const limiter = rateLimit({
// windowMs:15 * 60 * 1000,
// max: 100,
// message: "Too many requests from this IP, please try again later."
// })
// app.use(limiter)









//    Helmet     prevent many hacking attack  //use when deploy on server
//helmet may security headers hotay hain jo prevent krtay hain attack say

// npm install helmet

// const helmet = require("helmet");
// app.use(helmet());


//agar helmet may say kisi header ko band krna ho
// app.use(
// helmet({
// contentSecurityPolicy: false,
// xDownloadOptions: false,
// })
// )








const express = require("express");
const app = express();
const connectDB = require("./config/database");
const path = require('path');
const studentRoutes = require("./routes/student.route");
const PORT = process.env.PORT;
const cors = require("cors");
const userRouter = require("./routes/users.route");
const auth = require("./middleware/auth");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");



connectDB();
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));





const limiter= rateLimit({
 windowMs:1000 * 60,      //1 min may 10 request handel kray ga zaida hui to msg jay ga
  max: 10,
 message: "Too many requests from this IP, please try again later."
})



// app.use(helmet());   //uncommint when deploy


app.use(limiter)               //user or student kay route say phly ya middleware run hogi
app.use("/api/users", userRouter);

app.use(auth); // Apply auth middleware to all routes below this line
app.use("/api/students", studentRoutes);





app.listen(PORT, () => {
  console.log(`Successfully connected http://localhost:${PORT}`);
});
