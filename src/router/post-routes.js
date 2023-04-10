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

postRoutes.get(
  '/',
  tokenValidate,
  controllerPosts.findAllPosts,
);

postRoutes.get(
  '/search',
  tokenValidate,
  controllerPosts.findPostByQuery,
);

postRoutes.get(
  '/:id',
  tokenValidate,
  controllerPosts.findPostById,
);

postRoutes.put(
  '/:id',
  tokenValidate,
  validateContent,
  validateTitle,
  controllerPosts.updatePostById,
);

postRoutes.delete(
  '/:id',
  tokenValidate,
  controllerPosts.deletePostById,
);

module.exports = postRoutes;