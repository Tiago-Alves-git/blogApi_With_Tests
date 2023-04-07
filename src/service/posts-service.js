const { BlogPost, PostCategory } = require('../models');

const httpErrGen = (status, message) => ({ status, message });

const createPost = async (title, content, categoryIds, id) => {
  try { 
    const post = await BlogPost.create({
      raw: true,
      title,
      content,
      userId: id,
    });
    const postCategory = categoryIds.map((CategoryId) => PostCategory.bulkCreate([
      { postId: post.dataValues.id, categoryId: CategoryId },
    ]));
     await Promise.all(postCategory);
    // promise.map((resultado) => resultado[0].dataValues);
    return post.dataValues;
  } catch (error) {
    throw httpErrGen(400, 'one or more "categoryIds" not found');
  }
};

module.exports = {
  createPost,
};