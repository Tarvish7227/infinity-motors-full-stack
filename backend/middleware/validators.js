const { body } = require("express-validator");
const { handleValidationErrors } = require("../utils/validation");

// Validation rules for login
const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  handleValidationErrors,
];

// Validation rules for register
const validateRegister = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters")
    .isLength({ max: 50 })
    .withMessage("Name cannot exceed 50 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .isLength({ max: 128 })
    .withMessage("Password cannot exceed 128 characters"),
  body("phone")
    .optional()
    .trim()
    .matches(/^[0-9\-\+\(\)\s]{0,20}$/)
    .withMessage("Invalid phone format"),
  handleValidationErrors,
];

// Validation rules for password change
const validatePasswordChange = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .custom((value, { req }) => {
      if (value === req.body.currentPassword) {
        throw new Error("New password must be different from current password");
      }
      return true;
    }),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Password confirmation is required")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  handleValidationErrors,
];

// Validation rules for profile update
const validateProfileUpdate = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters")
    .isLength({ max: 50 })
    .withMessage("Name cannot exceed 50 characters"),
  body("phone")
    .optional()
    .trim()
    .matches(/^[0-9\-\+\(\)\s]{0,20}$/)
    .withMessage("Invalid phone format"),
  handleValidationErrors,
];

module.exports = {
  validateLogin,
  validateRegister,
  validatePasswordChange,
  validateProfileUpdate,
};
