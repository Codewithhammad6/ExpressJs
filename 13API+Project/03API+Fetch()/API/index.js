const express= require('express');
const app = express();
const studentRoutes=require('./routes/students.routes')
const connectDB = require('./config/database');
const cors= require('cors');
const path = require('path');

//Connect Database
connectDB();
const PORT = process.env.PORT;



//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads',express.static(path.join(__dirname, 'uploads'))); //Static files for serving images // This line allows the server to serve static files from the 'uploads' directory, making them accessible via HTTP requests.
app.use(cors());  //issay nichay jitnay bhi routes hain unko access kar sakte hain cors origin say koi bhi request aaye wo in below api ko use kr sakta ha


//Routes
app.use('/api/students', studentRoutes);


app.use((err,req,res,next) => {
  if(err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }else if(err) {
    return res.status(500).json({ message: 'An unknown error occurred.' });
  }
  next();
});


app.listen(PORT, () => {
    console.log(`Successfully Connected http://localhost:${PORT}`);
});