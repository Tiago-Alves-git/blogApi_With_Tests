const serviceLogin = require('../service/login-service');
const { generateToken } = require('../utils/auth'); 

const login = async (req, res, next) => {
  const data = req.body;
  try {                               
    const result = await serviceLogin.login(data);
    const { displayName, id, email } = result;
    const geraToken = await generateToken({ id, displayName, email });
    return res.status(200).json({ token: geraToken });
  } catch (error) {                                         
    next(error);
  }        
};

module.exports = {
  login,
};