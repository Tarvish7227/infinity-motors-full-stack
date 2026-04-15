const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getCurrentUser,
  updateProfile,
  changePassword,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { loginLimiter } = require("../middleware/rateLimiter");
const {
  validateLogin,
  validateRegister,
  validatePasswordChange,
  validateProfileUpdate,
} = require("../middleware/validators");

// Public routes
router.post("/register", validateRegister, register);
router.post("/login", loginLimiter, validateLogin, login);

// Protected routes
router.get("/me", protect, getCurrentUser);
router.put("/profile", protect, validateProfileUpdate, updateProfile);
router.put("/change-password", protect, validatePasswordChange, changePassword);

module.exports = router;
