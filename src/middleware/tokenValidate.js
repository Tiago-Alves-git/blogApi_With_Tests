const { validateToken } = require('../utils/auth');

const tokenValidate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || authorization.length <= 0) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    validateToken(authorization);
  } catch (_error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
};

module.exports = {
  tokenValidate,
};