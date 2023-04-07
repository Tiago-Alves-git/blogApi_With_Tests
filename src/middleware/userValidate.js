const validName = (req, res, next) => {
  const { displayName } = req.body;
  if (!displayName || displayName.length <= 8) {
    return res.status(400).json({ message:
    '"displayName" length must be at least 8 characters long' });
  }
  next();
};

const validEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const tester = regex.test(email);
  if (!email || !tester) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  next();
};

const validPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || password.length <= 5) {
    return res.status(400).json({ message: 
      '"password" length must be at least 6 characters long' });
  }
  next();
};

module.exports = {
  validName,
  validEmail,
  validPassword,
};