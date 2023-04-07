const { BlogPost, PostCategory, User, Category } = require('../models');
const { decodeToken } = require('../utils/auth');

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

const findPostById = async (id) => {
  const [result] = await BlogPost.findAll({ 
    where: { userId: id },
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
   if (!result) {
    throw httpErrGen(404, 'Post does not exist');
   }

   return result;
};

const updatePostById = async (title, content, id, auth) => {
  const oldPost = await findPostById(id);
  const user = await decodeToken(auth);
  if (oldPost.dataValues.userId !== user.id) {
    throw httpErrGen(401, 'Unauthorized user');
  }
  await BlogPost.update({ title: `${title}`, content: `${content}` }, {
      where: { id },
    });
    const result = await findPostById(id);
  return result;
};

module.exports = {
  createPost,
  findAllPosts,
  findPostById,
  updatePostById,
};