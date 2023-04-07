const categoriesRoutes = require('express').Router();
const controllerCategories = require('../controller/categories-controller');
const { validateName } = require('../middleware/categoriesValidate');
const { tokenValidate } = require('../middleware/tokenValidate');

categoriesRoutes.post('/', tokenValidate, validateName, controllerCategories.createCategory);
categoriesRoutes.get('/', tokenValidate, controllerCategories.getAllCategories);

module.exports = categoriesRoutes;