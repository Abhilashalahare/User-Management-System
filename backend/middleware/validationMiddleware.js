import { body, validationResult } from 'express-validator';

// Helper function to handle errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateSignup = [
  body('fullName', 'Full name is required').notEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  
 
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*]/)
    .withMessage('Password must contain at least one special character (!@#$%^&*)'),
  
  handleValidationErrors
];

export const validateLogin = [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists(),
  handleValidationErrors
];