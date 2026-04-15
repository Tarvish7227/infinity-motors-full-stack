const { validationResult } = require("express-validator");

// Format validation errors
const formatValidationErrors = (errors) => {
  const formattedErrors = {};
  errors.array().forEach((error) => {
    if (error.param) {
      formattedErrors[error.param] = error.msg;
    }
  });
  return formattedErrors;
};

// Check for validation errors middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: formatValidationErrors(errors),
    });
  }
  next();
};

// Sanitize email
const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

// Validate password strength
const validatePasswordStrength = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasNonalphaNumericChars = /\W/.test(password);
  const isLengthValid = password.length >= 8;

  return {
    isStrong:
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      (hasNonalphaNumericChars || isLengthValid),
    hasUpperCase,
    hasLowerCase,
    hasNumbers,
    hasNonalphaNumericChars,
    isLengthValid,
  };
};

module.exports = {
  handleValidationErrors,
  formatValidationErrors,
  validateEmail,
  validatePasswordStrength,
};
