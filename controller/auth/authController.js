// authController.js

const registerUser = require('./registerUser');
const login = require('./login');
const getUsers = require('./getUsers');

// Handle new staff
exports.registerUser = registerUser;

// Handle login
exports.login = login;

// Handle get all users
exports.getUsers = getUsers;
