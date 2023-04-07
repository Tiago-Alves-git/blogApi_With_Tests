const loginRoutes = require('express').Router();
const controllerLogin = require('../controller/login-controller');
const { validateInputs } = require('../middleware/loginValidate');

loginRoutes.post('/', validateInputs, controllerLogin.login);

module.exports = loginRoutes;