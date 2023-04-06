const { User } = require('../models');

const httpErrGen = (status, message) => ({ status, message });

const login = async (data) => {
  const { email, password } = data;
  const teste = await User.findOne({
    where: { email, password },
  });
  if (!teste || teste.length <= 0) {
    throw httpErrGen(400, 'Invalid Fields');
  }
  const Result = await User.create({
    email,
    password,
  });
  return Result;
};

module.exports = {
  login,
};