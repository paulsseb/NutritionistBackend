// Filename : auth.js

const express = require('express');
const { check } = require('express-validator/check');

// Import auth controller
const authController = require('../controller/auth/authController');

const router = express.Router();
const authenticator = require('../middleware/authenticator');

/**
 * @method - POST
 * @param - /registerUser
 * @description - User registration in the system
 */
router.post(
  '/registerUser',
  [
    // input validations
    check('fName', 'Please Enter a Valid First Name')
      .not()
      .isEmpty(),
    check('lName', 'Please Enter a Valid Last Name')
      .not()
      .isEmpty(),
    check('phoneNumber', 'Please Enter a phone number')
      .not()
      .isEmpty(),
    check('expoPushNotificationToken', 'Please supply a Valid token')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({
      min: 6
    })
  ],
  authController.registerUser
);

/**
 * @method - POST
 * @param - /login
 * @description - User authentication into the system. calls controller after checking inputs
 */
router.post(
  '/login',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Minimum password length is 6').isLength({
      min: 6
    })
  ],
  authController.login
);


/**
 * @method - GET
 * @description - Get Users. authenticator is a middleware will be used to
 * verify the token, retrieve user based on the token payload.
 * calls controller after checking inputs
 * @param - /auth/getUsers
 */
router.get('/getUsers', authenticator, authController.getUsers);

/**
 * @method - POST
 * @param - /removeUser
 * @description - User registration in the system
 */
router.post(
  '/removeUser',
  [
    // input validations
    check('email', authenticator, 'Please enter a valid email').isEmail()
  ],
  authController.removeUser
);

module.exports = router;
