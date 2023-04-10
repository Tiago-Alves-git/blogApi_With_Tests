const serviceUser = require('../service/user-service');
const { generateToken } = require('../utils/auth'); 

const signUp = async (req, res, next) => {
  const data = req.body;
  try {
    const { dataValues } = await serviceUser.signUp(data);
    const { id } = dataValues;
    const { email, displayName } = data;
    const tkn = generateToken({ displayName, id, email });
    return res.status(201).json({ token: tkn });
  } catch (error) {
    next(error);
  }
};

const findAllUsers = async (_req, res, next) => {
  try {
    const result = await serviceUser.findAllUsers();
  return res.status(200).json(result);
} catch (error) {
  next(error);
}
};

const findUserById = async (req, res, next) => {
  const { id } = req.params;
  console.log(id, 'id');
  try {
    const result = await serviceUser.findUserById(id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteMe = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    await serviceUser.deleteMe(authorization);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  findAllUsers,
  findUserById,
  deleteMe,
};