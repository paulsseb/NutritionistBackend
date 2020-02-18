const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const debug = require('debug')('server');
const User = require('../../model/User');

const login = async (req, res) => {
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

  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email
    });

    let isMatch;
    if (user) {
      isMatch = await bcrypt.compare(password, user.password);
    }

    if (!user || !isMatch) {
      return res.status(400).json({
        message: 'Invalid email or password'
      });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      'secret',
      {
        expiresIn: '30 days' //  values are in seconds, strings need timeunits i.e. "2 days", "10h", "7d"
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
          user
        });
      }
    );
  } catch (e) {
    debug(e);
    res.status(500).json({
      message: 'Server Error'
    });
  }
};

module.exports = login;
