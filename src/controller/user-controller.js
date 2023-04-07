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

module.exports = {
  signUp,
};