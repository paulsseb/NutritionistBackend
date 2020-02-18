// Import express
require('dotenv').config();
const express = require('express');
const debug = require('debug')('server');
const cors = require('cors');

const InitiateMongoServer = require('./config/db');

// Import routes
const auth = require('./routes/auth');
const pushNotificationApi = require('./routes/pushNotificationApi');

// Initialise the app
const app = express();

// Configure express to handle post requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Initiate Mongo Server
InitiateMongoServer();

// Setup server port
const port = 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Nutritionist Server API running'));

// Use Api routes in the App
app.use('/auth', auth);
app.use('/pushNotificationApi', pushNotificationApi);

// Launch app to listen to specified port
app.listen(port, () => {
  debug(`Nutritionist API running on port ${port}`);
  console.log(`Nutritionist API running on port ${port}`);
});
