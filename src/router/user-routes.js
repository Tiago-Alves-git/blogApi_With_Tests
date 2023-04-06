const userRoutes = require('express').Router();
const controllerLogin = require('../controller/login-controller');
const { validateInputs } = require('../middleware/loginValidate');

userRoutes.post('/', validateInputs, controllerLogin.login);

module.exports = userRoutes;