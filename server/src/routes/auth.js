const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { auth } = require('../middleware/auth');
const { ROLES } = require('../middleware/auth');
const authController = require('../controllers/authController');
const apiLimiter = require('../middleware/rateLimiter');

// Public routes
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
    check('role', 'Invalid role').optional().isIn(Object.values(ROLES))
  ],
  apiLimiter,
  authController.register
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  apiLimiter,
  authController.login
);

// Protected routes
router.use(auth());

router.get('/me', authController.getMe);
router.put('/updatedetails', authController.updateDetails);
router.put('/updatepassword', authController.updatePassword);

// Admin only routes
router.use(auth([ROLES.ADMIN]));
// Add admin-only routes here

module.exports = router;
