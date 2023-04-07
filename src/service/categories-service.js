const { User } = require('../models');

const createCategory = async (name) => {
  const { dataValues } = await User.create({
    name,
  });

  return dataValues.id;
};

module.exports = {
  createCategory,
};