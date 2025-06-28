const express= require('express');
const app = express();
const studentRoutes=require('./routes/students.routes')
const connectDB = require('./config/database');

//Connect Database
connectDB();
const PORT = process.env.PORT;





//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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