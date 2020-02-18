const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const debug = require('debug')('server');
// const jwt = require('jsonwebtoken');
// const Mailer = require('../../helpers/Mailer');
const User = require('../../model/User');
// const Token = require('../../model/Token');

const registerUser = async (req, res) => {
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

  const {
    fName,
    lName,
    phoneNumber,
    expoPushNotificationToken,
    email,
    password
  } = req.body;
  try {
    let user = await User.findOne({
      email
    });

    if (user) {
      return res.status(400).json({
        message: 'User Already Exists'
      });
    }
    user = new User({
      fName,
      lName,
      phoneNumber,
      expoPushNotificationToken,
      email,
      password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.status(200).json({
      message: 'you have been registered'
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Error in Saving' });
  }
};

module.exports = registerUser;
