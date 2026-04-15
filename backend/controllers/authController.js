const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { validatePasswordStrength } = require("../utils/validation");

// Track login attempts - in production, use Redis or database
const loginAttempts = new Map();

const getLoginAttempts = (email) => {
  if (!loginAttempts.has(email)) {
    return { attempts: 0, lastAttempt: null };
  }
  return loginAttempts.get(email);
};

const recordLoginAttempt = (email) => {
  const current = getLoginAttempts(email);
  loginAttempts.set(email, {
    attempts: current.attempts + 1,
    lastAttempt: Date.now(),
  });
};

const resetLoginAttempts = (email) => {
  loginAttempts.delete(email);
};

const isAccountLocked = (email) => {
  const { attempts, lastAttempt } = getLoginAttempts(email);
  const lockoutTime = 15 * 60 * 1000; // 15 minutes
  const timeSinceLastAttempt = Date.now() - lastAttempt;

  if (attempts >= 5 && timeSinceLastAttempt < lockoutTime) {
    return true;
  }

  if (timeSinceLastAttempt > lockoutTime) {
    resetLoginAttempts(email);
    return false;
  }

  return false;
};

// Generate JWT Token
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
  return token;
};

// Register user
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Validate password strength
    const passwordStrength = validatePasswordStrength(password);
    if (!passwordStrength.isStrong) {
      return res.status(400).json({
        success: false,
        message:
          "Password is not strong enough. It must contain uppercase, lowercase, numbers, and be at least 8 characters.",
        requirements: passwordStrength,
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone,
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

// Login user with enhanced validation
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Trim and validate input
    const trimmedEmail = email.trim().toLowerCase();

    // Check if account is locked due to too many attempts
    if (isAccountLocked(trimmedEmail)) {
      return res.status(429).json({
        success: false,
        message:
          "Account temporarily locked due to too many login attempts. Please try again later.",
      });
    }

    // Check for user (include password field)
    const user = await User.findOne({ email: trimmedEmail }).select(
      "+password",
    );

    if (!user) {
      recordLoginAttempt(trimmedEmail);
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      recordLoginAttempt(trimmedEmail);
      const attempts = getLoginAttempts(trimmedEmail);
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
        attemptsRemaining: Math.max(0, 5 - attempts.attempts),
      });
    }

    // Reset login attempts on successful login
    resetLoginAttempts(trimmedEmail);

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get user",
      error: error.message,
    });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    user.updatedAt = Date.now();

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Validate new password strength
    const passwordStrength = validatePasswordStrength(newPassword);
    if (!passwordStrength.isStrong) {
      return res.status(400).json({
        success: false,
        message:
          "New password is not strong enough. It must contain uppercase, lowercase, numbers, and be at least 8 characters.",
        requirements: passwordStrength,
      });
    }

    // Update password
    user.password = newPassword;
    user.updatedAt = Date.now();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to change password",
      error: error.message,
    });
  }
};
