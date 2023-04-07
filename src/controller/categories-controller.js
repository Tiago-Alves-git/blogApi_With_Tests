const serviceCategories = require('../service/categories-service');

const createCategory = async (req, res, next) => {
  const { name } = req.body;
  try {
    const result = await serviceCategories.createCategory(name);
    return res.status(201).json({ id: result, name });
  } catch (error) {
    next(error);
  }
};

const getAllCategories = async (_req, res, next) => {
  try {
    const result = await serviceCategories.getAllCategories();
    console.log(result, 'results');
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { 
  createCategory, 
  getAllCategories,
 };