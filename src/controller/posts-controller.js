const { checkCategory } = require('../service/categories-service');
const servicePosts = require('../service/posts-service');
const { decodeToken } = require('../utils/auth');

const createPost = async (req, res, next) => {
  const { authorization } = req.headers;
  const { content, title, categoryIds } = req.body;
  try {
    await checkCategory(categoryIds);
    const decoded = await decodeToken(authorization);
    const { id } = decoded;
    const result = await servicePosts.createPost(title, content, categoryIds, id);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const findAllPosts = async (_req, res, next) => {
  try {
   const result = await servicePosts.findAllPosts();
   console.log(result);
   return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const findPostById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await servicePosts.findPostById(id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  findAllPosts,
  findPostById,
};