// const { Op } = require('sequelize');
const { Op } = require('sequelize');
const { BlogPost, User, Category } = require('../models');
const { decodeToken } = require('../utils/auth');

const httpErrGen = (status, message) => ({ status, message });

const createPost = async (title, content, categoryIds, id) => {
  try { 
    const post = await BlogPost.create({
      raw: true,
      title,
      content,
      userId: id,
      published: new Date(),
      updated: new Date(),
    });
    await post.addCategories(categoryIds);
    
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
      through: { attributes: [] },
    }],
   });

  return result;
};

const findPostById = async (id) => {
  const [result] = await BlogPost.findByPk(id, { 
    include: [{
      model: User,
      attributes: { exclude: ['password'] },
      as: 'user',
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
   });
   if (!result) {
    throw httpErrGen(404, 'Post does not exist');
   }

   return result;
};

const updatePostById = async (title, content, id, auth) => {
  const oldPost = await findPostById(id);
  const user = decodeToken(auth);
  if (oldPost.dataValues.userId !== user.id) {
    throw httpErrGen(401, 'Unauthorized user');
  }
  await BlogPost.update({ title: `${title}`, content: `${content}` }, {
      where: { id },
    });
    const result = await findPostById(id);
  return result;
};

const deletePostById = async (id, auth) => {
  const oldPost = await findPostById(id);
  const user = decodeToken(auth);
  if (oldPost.dataValues.userId !== user.id) {
    throw httpErrGen(401, 'Unauthorized user');
  }
  const result = await BlogPost.destroy({
    where: { id },
  });
  if (result !== 1) {
    throw httpErrGen(401, 'Delete post failed');
  }
  return result;
};

const findPostByQuery = async (data) => {
  if (data.length === 0) return findAllPosts();
  const result = await BlogPost.findAll({
    where: {
      [Op.or]: [{ title: { [Op.in]: [data] } }, { content: { [Op.in]: [data] } }],
    },
    include: [{
      model: User,
      attributes: { exclude: ['password'] },
      as: 'user',
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });
  return result;
};

module.exports = {
  createPost,
  findAllPosts,
  findPostById,
  updatePostById,
  deletePostById,
  findPostByQuery,
};