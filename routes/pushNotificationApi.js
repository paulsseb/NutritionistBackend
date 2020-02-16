// Filename : leave.js
const express = require('express');
const { check } = require('express-validator/check');

const router = express.Router();
// Import leave controller
const notificationController = require('../controller/notification/notificationController');
const authenticator = require('../middleware/authenticator');

/**
 * @method - POST
 * @description - Request for a leave. authenticator is a middleware will be used to
 * verify the token.
 * @param - /notificationApi/notify
 */
router.post(
  '/notify',
  [
    // valid date 2018-05-12
    // check("startDate", "Please Enter a Valid Date").matches(),

    // input validations date validation pending
    check('title', 'Please enter a title')
      .not()
      .isEmpty(),
    check('message', 'Please Enter a message')
      .not()
      .isEmpty(),
    check('staffEmail', 'Please Enter a Valid Email').isEmail()
  ],
  authenticator,
  notificationController.createNotification
);

module.exports = router;
