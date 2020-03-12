const { validationResult } = require('express-validator/check');
const debug = require('debug')('server');
// const jwt = require('jsonwebtoken');
// const Mailer = require('../../helpers/Mailer');
const User = require('../../model/User');
// const Token = require('../../model/Token');

const removeUser = async (req, res) => {
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
    email
  } = req.body;
  try {
    const user = await User.findOne({
      email
    });

    if (!user) {
      return res.status(400).json({
        message: 'User Does not Exist'
      });
    }
    await user.remove();
    res.status(200).json({
      message: 'User has been removed'
    });
  } catch (err) {
    debug(err.message);
    res.status(500).json({ message: 'Error in Removing' });
  }
};

module.exports = removeUser;
