const jwt = require('jsonwebtoken');

const httpErrGen = (status, message) => ({ status, message });

const secretKey = process.env.JWT_SECRET;

const configJWT = {
  expiresIn: '100d',
  algorithm: 'HS256',
};

const generateToken = (payload) => {
  const token = jwt.sign(payload, secretKey, configJWT);
  return token;
};

const validateToken = (token) => {
  if (!token) throw httpErrGen(400, 'Token invalid');
  const isValid = jwt.verify(token, secretKey);
  console.log(isValid, 'isValid');
  return isValid;
};

const decodeToken = (token) => {
  if (!token) httpErrGen(400, 'Token invalid');
  const decoded = jwt.decode(token, secretKey);
  return decoded;
};

module.exports = {
  generateToken,
  validateToken,
  decodeToken,
};