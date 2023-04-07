const { BlogPost, PostCategory, User, Category } = require('../models');

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
    return post.dataValues;
  } catch (error) {
    throw httpErrGen(400, 'one or more "categoryIds" not found');
  }
};

const findAllPosts = async () => {
  const result = await BlogPost.findAll({ 
    include: [{
      model: User,
      attributes: { exclude: ['password'] },
      as: 'user',
    },
    {
      model: Category,
      as: 'categories',
    }],
   });
   const teste = result.map((results) => results.dataValues);
  console.log(teste);
  return result;
};

module.exports = {
  createPost,
  findAllPosts,
};