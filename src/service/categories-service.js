const { Category } = require('../models');

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

module.exports = {
  createCategory,
  getAllCategories,
};