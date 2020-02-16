// Import Mongoose
const mongoose = require('mongoose');
const debug = require('debug')('server');

// Replace this with your MONGOURI.
const MONGOURI = process.env.MONGODB_URI;
// console.log (process.env.MONGODB_URI);
const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    debug('Connected to DB !!');
  } catch (e) {
    debug(`Mongodb server not running.. ${e}`);
    throw e;
  }
};

module.exports = InitiateMongoServer;
