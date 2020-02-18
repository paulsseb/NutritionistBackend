// Import Mongoose
const mongoose = require('mongoose');
const debug = require('debug')('server');

// provide a sensible default for local development

// const mongodb_connection_string = 'mongodb://172.30.165.67:27017/nutritionist';

// Connect to Mongodb
const username ='nutritionist';
const password = 'secret123';

const host = '172.30.165.67';
const port = '27017';

const database = 'nutritionist';
console.log('---DATABASE PARAMETERS---');
console.log(`Host: ${host}`);
console.log(`Port: ${port}`);
console.log(`Username: ${username}`);
console.log(`Password: ${password}`);
console.log(`Database: ${database}`);

const mongodb_connection_string = `mongodb://${username}:${password}@${host}:${port}/${database}`;
// const mongodb_connection_string = 'mongodb://localhost/nutritionist';
// take advantage of openshift env vars when available:
// if(process.env.OPENSHIFT_MONGODB_DB_URL){
// var mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + 'nutritionist';
// }

// console.log (process.env.MONGODB_URI);
const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(mongodb_connection_string, {
      useNewUrlParser: true
    });
    console.log('Connected to DB !!');
  } catch (e) {
    console.log(`Mongodb server not running.. ${e}`);
    throw e;
  }
};

module.exports = InitiateMongoServer;
