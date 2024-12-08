const express = require('express');
const authentication = express.Router();
const taskController = require('../controllers/taskController');

authentication.post('/login', taskController.login);
authentication.post("/register", taskController.register)

module.exports = authentication;