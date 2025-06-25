const express= require('express');
const app = express();
const studentRoutes=require('./routes/students.routes')
const connectDB = require('./config/database');

connectDB();
const PORT = process.env.PORT;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/students', studentRoutes);

app.listen(PORT, () => {
    console.log(`Successfully Connected http://localhost:${PORT}`);
});