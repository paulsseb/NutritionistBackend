// Import Mongoose
const mongoose = require('mongoose');
const debug = require('debug')('server');

//provide a sensible default for local development
var mongodb_connection_string = 'mongodb://10.129.2.45:27017/nutritionist';
//take advantage of openshift env vars when available:
//if(process.env.OPENSHIFT_MONGODB_DB_URL){
 // var mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + 'nutritionist';
//}


// console.log (process.env.MONGODB_URI);
const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(mongodb_connection_string, {
      useNewUrlParser: true
    });
    debug('Connected to DB !!');
  } catch (e) {
    debug(`Mongodb server not running.. ${e}`);
    throw e;
  }
};

module.exports = InitiateMongoServer;
