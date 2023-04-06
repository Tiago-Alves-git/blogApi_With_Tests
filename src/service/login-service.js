const { User } = require('../models');

const httpErrGen = (status, message) => ({ status, message });

const login = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({
    where: { email, password },
  });
  if (!user || user.length <= 0) {
    throw httpErrGen(400, 'Invalid fields');
  }
  return user;
};

module.exports = {
  login,
};