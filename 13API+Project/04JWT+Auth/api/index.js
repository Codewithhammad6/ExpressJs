const express = require("express");
const app = express();
const connectDB = require("./config/database");
const path = require('path');
const studentRoutes = require("./routes/student.route");
const PORT = process.env.PORT;
const cors = require("cors");
const userRouter = require("./routes/users.route");
connectDB();
const auth = require("./middleware/auth");

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/api/users", userRouter);
app.use(auth); // Apply auth middleware to all routes below this line
app.use("/api/students", studentRoutes);

app.listen(PORT, () => {
  console.log(`Successfully connected http://localhost:${PORT}`);
});
