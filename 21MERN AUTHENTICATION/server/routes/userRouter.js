import express from "express";
const router = express.Router();
import {forgotPassword, getUser, login, logout, register, resetPassword, verifyOTP} from "../controllers/userController.js"
import { isAuthenticated } from "../middleware/auth.js";
import { registerLimiter } from "../middleware/rateLimiter.js";




router.post("/register", register);
router.post("/otp-verification", verifyOTP);
router.post("/login", login);
router.get("/logout",isAuthenticated, logout);
router.get("/me",isAuthenticated, getUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);


export default router