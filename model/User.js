// FILENAME : User.js
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  fName: {
    type: String,
    required: true
  },
  lName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  expoPushNotificationToken: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  }

});

// export model user with UserSchema
module.exports = mongoose.model('user', UserSchema);
