import rateLimit from "express-rate-limit";

export const registerLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res, next, options) => {
    return res.status(429).json({
      success: false,
      message: "Too many attempts. Please try again after 15 minutes.",
    });
  },
});
