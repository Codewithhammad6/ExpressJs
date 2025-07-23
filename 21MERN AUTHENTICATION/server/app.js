import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from "cookie-parser";
import {connection} from "./database/dbConnection.js"
import { errorMiddleware } from "./middleware/error.js";
import userRouter from "./routes/userRouter.js"
import { removeUnverifiedAccounts } from "./automation/removeUnverifiedAccounts.js";

dotenv.config();

export const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

removeUnverifiedAccounts()
connection()

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/v1/user", userRouter);

app.use(errorMiddleware)