const userRoutes = require('express').Router();
const controllerUser = require('../controller/user-controller');
const { validName, validEmail,
  validPassword } = require('../middleware/userValidate');

userRoutes.post('/', validEmail, validName, validPassword, controllerUser.signUp);

module.exports = userRoutes;