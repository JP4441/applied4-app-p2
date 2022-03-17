const router = require('express').Router();
const { body } = require('express-validator');

// Import Authentication Controller
const authCntrl = require('../controllers/auth');
const { getMaxListeners } = require('../models/User');

// Routes for Authentication
router.get('/auth/signup', authCntrl.auth_signup_get);
router.post(
  '/auth/signup',
  [
    body('firstName')
      .isLength({ min: 5 })
      .withMessage('Name must be at least 5 chars long')
      .notEmpty()
      .withMessage('Name cannot be null'),
    body('emailAddress').isEmail(),
    body('password').isLength({ min: 5 }),
  ],
  authCntrl.auth_signup_post
);

router.get('/auth/signin', authCntrl.auth_signin_get);
router.post('/auth/signin', authCntrl.auth_signin_post);
router.get('/auth/logout', authCntrl.auth_logout_get);

module.exports = router;
