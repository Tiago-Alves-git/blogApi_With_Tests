const { User } = require('../models');
const { decodeToken } = require('../utils/auth');

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

const findAllUsers = async () => {
  const result = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  return result;
};

const findUserById = async (id) => {
  try {
    const [result] = await User.findAll({
      attributes: ['id', 'displayName', 'email', 'image'],
      where: { id },
    });
    return result.dataValues;
  } catch (error) {
    throw httpErrGen(404, 'User does not exist');
  }
};

const deleteMe = async (auth) => {
 const { id } = decodeToken(auth);
 const result = await User.destroy({
  where: { id },
 });
return result;
};

module.exports = {
  signUp,
  findAllUsers,
  findUserById,
  deleteMe,
};