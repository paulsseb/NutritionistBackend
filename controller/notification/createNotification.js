const { validationResult } = require('express-validator/check');
const debug = require('debug')('leave-controller');
const User = require('../../model/User');
// Import auth controller
const handlePushTokens = require('../../helpers/handlePushTokens');

const createNotification = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let msg = '';
    errors.array().forEach((error) => {
      msg = `${msg} ${error.msg} ::`;
    });
    return res.status(400).json({
      message: msg
    });
  }

  // prettier-ignore
  const {
    title,
    message,
    staffEmail,
    datetimepicker
  } = req.body;
  try {
    const user = await User.findOne({
      email: staffEmail
    });
    if (!user) {
      return res.status(400).json({
        message: 'User does not exist in system'
      });
    }
    // code for pushing notification
    handlePushTokens(message, title, datetimepicker, user.expoPushNotificationToken);
    console.log(datetimepicker);
    res.status(200).json({
      message: 'Client has been remainded successfully'
    });
  } catch (err) {
    debug(err.message);
    res.status(500).json({
      message: 'Error Sending notification'
    });
  }
};

module.exports = createNotification;
