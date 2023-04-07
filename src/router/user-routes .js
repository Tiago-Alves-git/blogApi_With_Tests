const userRoutes = require('express').Router();
const controllerUser = require('../controller/user-controller');
const { tokenValidate } = require('../middleware/tokenValidate');
const { validName, validEmail,
  validPassword } = require('../middleware/userValidate');

userRoutes.post('/', validEmail, validName, validPassword, controllerUser.signUp);

userRoutes.get('/', tokenValidate, controllerUser.findAllUsers);

module.exports = userRoutes;