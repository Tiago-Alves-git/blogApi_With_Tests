const validateInputs = async (req, res, next) => {
  const { name, email } = req.body;
  if (!name || name.length <= 0) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  if (!email || email.length <= 0) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

module.exports = {
  validateInputs,
};