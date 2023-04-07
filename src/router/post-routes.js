const postRoutes = require('express').Router();
const controllerPosts = require('../controller/posts-controller');
const { validateContent, validateIdField, validateTitle } = require('../middleware/postsValidate');
const { tokenValidate } = require('../middleware/tokenValidate');

postRoutes.post(
'/', 
tokenValidate, 
validateContent,
validateIdField, 
validateTitle, 
controllerPosts.createPost,
);

module.exports = postRoutes;