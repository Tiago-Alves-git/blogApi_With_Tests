const serviceLogin = require('../service/login-service');

const login = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await serviceLogin.login(data);
    return res.status(200).json({ token: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};