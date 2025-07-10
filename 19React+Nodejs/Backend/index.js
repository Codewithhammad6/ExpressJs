const express= require('express')
const app=express()
const contactRoutes = require('./routes/contactRoutes')
const mongoDB = require('./config/database')
const cors = require("cors");
const path = require('path')
const userRoutes = require('./routes/userRoutes')
const auth = require("./middleware/auth");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

mongoDB()
const PORT = process.env.PORT


const limiter = rateLimit({
  windowMs:5 * 60 * 1000, // 5 minutes
  max: 100, // limit each IP to 100 requests
  message: "Too many requests, please try again later.",
});



app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use(cors({
  origin: "http://localhost:5173", // React app URL
  credentials: true
}));



// app.use(helmet());   //uncommint when deploy

app.use(limiter);
app.use('/api/auth',userRoutes)
app.use(auth); // Apply auth middleware to all routes below this line
app.use('/api/contact',contactRoutes)




//Multer Error Handle
app.use((err,req,res,next) => {
  if(err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }else if(err) {
    return res.status(500).json({ message: 'An unknown error occurred.' });
  }
  next();
});



app.listen(PORT,()=>{
    console.log(`Successfully Connected http://localhost:${PORT}`)
})