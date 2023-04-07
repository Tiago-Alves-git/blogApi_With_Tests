const { User } = require('../models');

const httpErrGen = (status, message) => ({ status, message });

const signUp = async (data) => {
  const { displayName, email, password, image } = data;
  const test = await User.findOne({
    where: { email },
  });
  if (test !== null) {
    throw httpErrGen(409, 'User already registered');
  }
  const result = await User.create({
  displayName,
  email,
  password,
  image,
  });

  return result;
};

module.exports = {
  signUp,
};