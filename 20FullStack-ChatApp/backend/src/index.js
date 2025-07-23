import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { app, server } from "./lib/socket.js";

dotenv.config();
const PORT = process.env.PORT || 5001;

connectDB();


app.use(cors({origin:"http://localhost:5173",
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());


// API routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);


// Start server
server.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
