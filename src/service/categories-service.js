const { Category } = require('../models');

const httpErrGen = (status, message) => ({ status, message });

const createCategory = async (name) => {
  const { dataValues } = await Category.create({
    name,
  });

  return dataValues.id;
};

const getAllCategories = async () => {
  const result = await Category.findAll({
    raw: true,
  });
  return result;
};

const checkCategory = async (categoryIds) => {
  const result = categoryIds.map((CategoryId) => Category.findAll({ where: {
    id: CategoryId } }));
const promise = await Promise.all(result);
const test = promise.some((resultado) => resultado.length <= 0);
if (test) {
  throw httpErrGen(400, 'one or more "categoryIds" not found');
}
return test;
};
module.exports = {
  createCategory,
  getAllCategories,
  checkCategory,
};